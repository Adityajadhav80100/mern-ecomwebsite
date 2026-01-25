import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/axios";

function Checkout() {
  const userId = localStorage.getItem("userId");
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const navigate = useNavigate();

  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true); // 👈 NEW

  useEffect(() => {
    api.get(`cart/${userId}`).then((res) => {
      console.log("CART RESPONSE 👉", res.data);
      setCart(res.data.cart); // ✅ FIX HERE
    });
    api.get(`address/${userId}`)
      .then((res) => {
        setAddress(res.data.Address || []);
      })
      .finally(() => {
        setAddressLoading(false); // 👈 API FINISHED
      });
  }, [userId]);

  // ✅ REDIRECT ONLY AFTER ADDRESS API FINISHES
  useEffect(() => {
    if (!addressLoading && address.length === 0) {
      navigate("/checkout-address");
    }
  }, [addressLoading, address, navigate]);

  // ⏳ Wait till both APIs respond
  if (!cart || addressLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  const items = cart.items ?? [];

  const total = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select an address");
      return;
    }

    try {
      const res = await api.post("/order/order-place", {
        userId,
        addressId: selectedAddressId
      });

      navigate("/order-success", {
        state: {
          orderId: res.data.orderId,
          status: "Placed"
        }
      });

    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="mb-6">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Delivery Address</h2>

            <button
              onClick={() => navigate("/checkout-address")}
              className="text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              + Add New Address
            </button>
          </div>

          {address.map((addr) => (
            <label
              key={addr._id}
              className={`border rounded-md p-4 mb-3 bg-gray-50 flex gap-3 cursor-pointer 
      ${selectedAddressId === addr._id ? "border-blue-600" : ""}`}
            >
              <input
                type="radio"
                name="address"
                checked={selectedAddressId === addr._id}
                onChange={() => setSelectedAddressId(addr._id)}
              />

              <div>
                <p className="font-medium">{addr.fullname}</p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-700">
                  {addr.address}, {addr.city} - {addr.pincode}, {addr.state}
                </p>
              </div>
            </label>
          ))}

        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <p className="text-lg font-semibold">Total: ₹{total}</p>

          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;
