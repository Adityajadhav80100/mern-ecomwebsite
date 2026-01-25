import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 import { api } from "../api/axios";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    if (!userId) return;
    const res = await api.get(`/cart/${userId}`);
   setCart(res.data.cart);

  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post("/cart/remove", { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      removeItem(productId);
      return;
    }
    await api.post("/cart/update", { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return <div className="text-center py-20">Loading cart...</div>;
  }

  const items = cart?.items ?? [];

  const total = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">
                    {item.productId.title}
                  </h2>
                  <p className="text-gray-600">
                    ₹{item.productId.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  −
                </button>
                <span className="font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹{item.productId.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-600 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold">
              Total: ₹{total}
            </h2>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
