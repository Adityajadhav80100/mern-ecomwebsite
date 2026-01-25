import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>

        <p className="mb-2">
          <strong>Order ID:</strong> {state.orderId}
        </p>

        <p className="mb-4">
          <strong>Status:</strong> {state.status}
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;

