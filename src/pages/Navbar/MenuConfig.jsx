import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons";

export const MENU_ITEMS = [
  {
    key: "/home",
    label: "Home",
    icon: <HomeOutlined />,
  },
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
