import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProductDetail from "./pages/productDetail";

import ProductList from "./admin/Productlist";
import AddProduct from "./admin/addProduct";
import UpdateProduct from "./admin/updateProduct";
import Carts from "./pages/carts";
import Navbar from "./components/navbar";
import CheckoutAddress from "./pages/checkoutAddress";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/orderSuccses";

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
