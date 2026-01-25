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
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="justify-between flex items-center mb-6">

      <h1 className="text-3xl font-bold mb-6">📦 Product List</h1>
      <div className="mb-6">
        <Link   to="/admin/addproduct"
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
          ➕ Add New Product
        </Link>
          </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-lg overflow-h_idden">
        <table className="w-full">
          <thead className="bg-slate-700 text-slate-300">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-slate-700 hover:bg-slate-700"
                >
                  <td className="p-4">{product.title}</td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 flex gap-3">
                    <Link
                      to={`/admin/Product/edit/${product._id}`}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-400 hover:underline"
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
  );
}

export default ProductList;
