import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login/Login";
import CreateOrder from "../pages/CreateOrder/CreateOrder";
import Shops from "../pages/Shops/Shops";
import AddShop from "../pages/AddShop/AddShop";
import EditShop from "../pages/EditShop/EditShop";
import PrivateRoute from "../routes/PrivateRoute";
import Orders from "../pages/Orders/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    element: <RootLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/create-order",
            Component: CreateOrder,
          },
          {
            path: "/shops",
            Component: Shops,
          },
          {
            path: "/add-shop",
            Component: AddShop,
          },
          {
            path: "/orders",
            Component: Orders,
          },
        ],
      },
    ],
  },
]);
