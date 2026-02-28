import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const userId = localStorage.getItem("userId");
useEffect(() => {
const loadCart = async () => {
  const userId = localStorage.getItem("userId");
  console.log("Navbar userId 👉", userId);

  if (!userId) {
    setCartCount(0);
    return;
  }

  try {
    const res = await api.get(`/cart/${userId}`);
    const total =
      res.data?.cart?.items?.reduce(
        (sum, item) => sum + item.quantity,
        0
      ) || 0;

    setCartCount(total);
  } catch (err) {
    console.error("Cart load error", err);
    setCartCount(0);
  }
};


  loadCart();

  window.addEventListener("cartUpdated", loadCart);
  window.addEventListener("authChanged", loadCart);

  return () => {
    window.removeEventListener("cartUpdated", loadCart);
    window.removeEventListener("authChanged", loadCart);
  };
}, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-gray-900 hover:text-gray-600 transition"
        >
          Adiii Store
        </Link>

        <div className="flex items-center gap-6 text-gray-600">
          
          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full border border-transparent px-3 py-1 hover:border-gray-200 transition"
          >
            <span className="text-2xl">🛒</span>
            <span className="font-semibold">Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {!userId ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-lg text-sm font-medium hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded-lg text-sm font-medium hover:text-gray-900 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
