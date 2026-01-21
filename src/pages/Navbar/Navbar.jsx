import { Link, useLocation, useNavigate } from "react-router";
import CHLogo from "../../assets/CHARDIKE.png";
import TBSLogo from "../../assets/TBS logo.png";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import { MENU_ITEMS } from "./MenuConfig";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onMenuClick = ({ key }) => {
    navigate(key);
    setOpen(false);
  };
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* Left: Logo */}
      <div className="text-lg font-semibold mr-auto">
        <Link to="/">
          <img src={TBSLogo} alt="TBS Logo" className="h-auto w-40" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={MENU_ITEMS}
          onClick={onMenuClick}
          className=""
        />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{
          padding: 0,
          background:
            "linear-gradient(180deg, rgba(249,207,47,0.2) 0%, rgba(249,207,47,0.05) 100%)",
        }}
        headerStyle={{
          background:
            "linear-gradient(180deg, rgba(206, 168, 14, 0.2) 0%, rgba(249,207,47,0.05) 100%)",
          borderBottom: "none",
        }}
        s
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={MENU_ITEMS}
          onClick={onMenuClick}
          style={{
            background: "transparent",
          }}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
