import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";
import dummyProducts from "../data/dummyProducts";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const fallbackImage =
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=640&q=80";

  const loadProduct = async () => {
    try {
      const res = await api.get(
        `/Product?search=${search}&category=${category}`
      );

      const fetched = res.data.Getproducts || [];
      const shouldIncludeDummy = !search && !category;
      const mergedProducts = shouldIncludeDummy
        ? [
            ...fetched,
            ...dummyProducts.filter(
              (dummy) =>
                !fetched.some((product) => product._id === dummy._id)
            ),
          ]
        : fetched;

      setProducts(mergedProducts);
    } catch (err) {
      console.error("error in loadProduct", err);
      setProducts(dummyProducts);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      await api.post("/cart/add", {
        userId,
        productId,
        quantity: 1,
      });

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* 🔍 Search & Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/4 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          >
            <option value="">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Accessories">Accessories</option>
            <option value="Headphones">Headphones</option>
          </select>
        </div>

        {/* 🛒 Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-slate-400">
              No products found
            </p>
          ) : (
            products.map((product) => {
              const isDummy = product.isDummy;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-transparent p-5 shadow-md transition duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
                >
                  <Link to={`/Product/${product._id}`}>
                    <div className="h-52 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                      <img
                        src={product.image || fallbackImage}
                        onError={(e) => {
                          e.target.src = fallbackImage;
                        }}
                        className="max-h-full max-w-full object-contain rounded-xl"
                        alt={product.title}
                      />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </h2>

                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </Link>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-2xl font-semibold text-blue-600">
                      ₹{product.price}
                    </p>

                    {isDummy ? (
                      <button
                        disabled
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white opacity-60 cursor-not-allowed"
                      >
                        Sample
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(product._id)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
