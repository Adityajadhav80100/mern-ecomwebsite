import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useState } from "react";

function CheckoutAddress() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
    try {
      await api.post("/address/add", {
        ...form,
        userId,
      });
      navigate("/checkout");
    } catch (error) {
      console.error("Error saving address", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Delivery Address
        </h1>

        <div className="space-y-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
          ))}
        </div>

        <button
          onClick={saveAddress}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

export default CheckoutAddress;
