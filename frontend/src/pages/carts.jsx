import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 import { api } from "../api/axios";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const fallbackImage =
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=640&q=80";

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
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-white/80 p-8 text-center text-gray-500 shadow-lg">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.productId._id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center"
              >
                <div className="flex flex-1 items-center gap-4">
                  <img
                    src={item.productId.image || fallbackImage}
                    alt={item.productId.title}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.productId.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.productId.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <button
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity - 1)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl font-semibold text-gray-600 shadow-sm transition hover:border-gray-300"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity + 1)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl font-semibold text-gray-600 shadow-sm transition hover:border-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col items-end gap-1 text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{item.productId.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.productId._id)}
                    className="text-sm font-semibold text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-right shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Total: ₹{total}
              </h2>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
