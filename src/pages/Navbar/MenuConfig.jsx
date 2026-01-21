import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const MENU_ITEMS = [
  {
    key: "/orders",
    label: "Orders",
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "/products",
    label: "Products",
    icon: <AppstoreOutlined />,
  },
  {
    key: "/shops",
    label: "Shops",
    icon: <ShopOutlined />,
  },
];
