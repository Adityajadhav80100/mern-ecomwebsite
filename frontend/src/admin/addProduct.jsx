import React, { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/axios";

function AddProduct() {
  const [form, setform] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    stock: "",
  });
  const navigate = useNavigate();

  const handlechanges = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/Product/add", form);
      navigate("/admin/Products");
    } catch (err) {
      console.log("Error adding product: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900">✚ Add Product</h2>
        <p className="text-sm text-gray-500">
          Fill in the details to publish a new product.
        </p>

        <form onSubmit={handlesubmit} className="mt-6 space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handlechanges}
            type="text"
            placeholder="Product Title"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            name="image"
            value={form.image}
            onChange={handlechanges}
            type="text"
            placeholder="Image URL"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            name="price"
            value={form.price}
            onChange={handlechanges}
            type="number"
            placeholder="Price"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            name="stock"
            value={form.stock}
            onChange={handlechanges}
            type="number"
            placeholder="Stock"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            name="category"
            value={form.category}
            onChange={handlechanges}
            type="text"
            placeholder="Category"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <textarea
            placeholder="Description"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
