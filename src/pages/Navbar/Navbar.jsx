import { Link, useLocation, useNavigate } from "react-router";
import TBSLogo from "../../assets/TBS logo.png";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import { MENU_ITEMS } from "./MenuConfig";
import { Layout, Menu, Drawer, Button } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const onMenuClick = ({ key }) => {
    navigate(key);
    setOpen(false);
  };

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("user");
    navigate("/");
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
      {/* Logo */}
      <div className="mr-auto">
        <Link to="/home">
          <img src={TBSLogo} alt="TBS Logo" className="w-36" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-3">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={MENU_ITEMS}
          onClick={onMenuClick}
        />

        <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Mobile Actions */}
      <div className="md:hidden flex items-center gap-2">
        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} />

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
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={MENU_ITEMS}
          onClick={onMenuClick}
          style={{ background: "transparent" }}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
