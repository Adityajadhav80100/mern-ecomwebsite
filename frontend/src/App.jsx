import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import Carts from "./pages/carts";
import CheckoutAddress from "./pages/checkoutAddress";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/orderSuccses";

import ProductList from "./admin/Productlist";
import AddProduct from "./admin/addProduct";
import UpdateProduct from "./admin/updateProduct";

import Navbar from "./components/navbar";

/* ✅ Layout component (must start with CAPITAL letter) */
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

/* ✅ Router config */
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {path:"/cart" , element:<Carts/>},
      {path:"/checkout" , element:<Checkout/>},
      {path:"/checkout-address" , element:<CheckoutAddress/>},
      {path:"/order-success" , element:<OrderSuccess/>},

      // admin routes
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/addproduct", element: <AddProduct /> },
      { path: "/admin/product/edit/:id", element: <UpdateProduct /> },
    ],
  },
]);

/* ✅ App component */
export default function App() {
  return <RouterProvider router={router} />;
}
