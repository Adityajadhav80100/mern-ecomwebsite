import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../api/axios";

function UpdateProduct() {
  const [form, setform] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    stock: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const allowedFields = [
    "title",
    "price",
    "category",
    "description",
    "image",
    "stock",
  ];

  const LoadeData = async () => {
    try {
      const res = await api.get(`/Product/${id}`);
      const productData = res.data.product;
      const filteredData = {};
      allowedFields.forEach((field) => {
        filteredData[field] = productData[field];
      });
      setform(filteredData);
    } catch (err) {
      console.log("error in loading product data", err);
    }
  };

  useEffect(() => {
    LoadeData();
  }, []);

  const handlechanges = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Product/update/${id}`, form);
      navigate("/admin/products");
    } catch (err) {
      console.log("Error updating product: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900">
          ✏️ Update Product
        </h2>
        <p className="text-sm text-gray-500">
          Adjust the values and save to update the listing.
        </p>

        <form onSubmit={handlesubmit} className="mt-6 space-y-4">
          {allowedFields.map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handlechanges}
              type={field === "price" || field === "stock" ? "number" : "text"}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1)
              }
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          ))}

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
