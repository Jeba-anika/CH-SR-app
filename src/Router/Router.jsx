import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login/Login";
import CreateOrder from "../pages/CreateOrder/CreateOrder";
import Shops from "../pages/Shops/Shops";
import AddShop from "../pages/AddShop/AddShop";
import EditShop from "../pages/EditShop/EditShop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "/create-orders",
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
    ],
  },
]);
