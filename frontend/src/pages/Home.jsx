import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProduct = async () => {
    try {
      const res = await api.get(
        `/Product?search=${search}&category=${category}`
      );
      setProducts(res.data.Getproducts || []);
    } catch (err) {
      console.error("error in loadProduct", err);
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

    // 🔥 Notify navbar
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};


  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
        >
          <option value="">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Accessories">Accessories</option>
          <option value="Headphones">Headphones</option>
        </select>
      </div>

      {/* 🛒 Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-slate-400">
            No products found
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-slate-800 rounded-xl p-4 shadow-lg hover:-translate-y-1 transition"
            >
              {/* Link only for navigation */}
              <Link to={`/Product/${product._id}`}>
                <div className="h-44 bg-slate-900 rounded-lg flex items-center justify-center mb-3">
                  <img
                    src={product.image}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                    className="max-h-full max-w-full object-contain"
                    alt={product.title}
                  />
                </div>

                <h2 className="font-semibold text-base truncate">
                  {product.title}
                </h2>

                <p className="text-slate-400 text-sm line-clamp-2">
                  {product.description}
                </p>
              </Link>

              {/* Price + Add to Cart */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-blue-400 font-bold">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
