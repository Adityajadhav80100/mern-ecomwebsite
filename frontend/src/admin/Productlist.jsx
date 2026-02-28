import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProduct = async () => {
    try {
      const response = await api.get("/Product");
      console.log("RESPONSE.DATA 👉", response.data);
      setProducts(response.data.Getproducts || []);
    } catch (err) {
      console.error("Error loading products", err);
    }
  };

  const deleteProduct = async (_id) => {
    try {
      await api.delete(`/Product/delete/${_id}`);
      loadProduct();
    } catch (err) {
      console.error("error in deleting Product", err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            📦 Product List
          </h1>

          <Link
            to="/admin/addproduct"
            className="rounded-2xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
          >
            ✚ Add New Product
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Stock
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white text-sm text-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="p-4">{product.title}</td>
                    <td className="p-4 font-semibold text-gray-900">
                      ₹{product.price}
                    </td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4 flex gap-3">
                      <Link
                        to={`/admin/Product/edit/${product._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
