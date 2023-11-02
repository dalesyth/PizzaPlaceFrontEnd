import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./views/ErrorPage";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Login from "./views/Login";
import Cart from "./views/Cart";
import OrderPage from "./views/OrderPage";
import Register from "./views/Register";
import BuildPizza from "./views/BuildPizza";
import Logout from "./views/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order-page",
        element: <OrderPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/build-pizza",
        element: <BuildPizza />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
