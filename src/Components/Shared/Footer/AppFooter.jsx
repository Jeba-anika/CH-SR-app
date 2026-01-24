import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      className="
        bg-white
        border-t
        border-[#FAD443]
        text-gray-600
        px-6
        py-10
      "
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} The Beauty Science. All rights reserved.
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
