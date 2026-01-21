import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const TBSSpin = () => {
  const antIcon = (
    <LoadingOutlined className="!text-[#F9CF2F] !text-4xl" spin />
  );
  return (
    <div>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default TBSSpin;
