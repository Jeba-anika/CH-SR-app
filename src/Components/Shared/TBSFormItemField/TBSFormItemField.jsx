import { Form, Input } from "antd";
import React from "react";

const TBSFormItemField = ({ label, name, placeholder, type, isRequired }) => {
  return (
    <Form.Item
      layout="vertical"
      label={label}
      name={name}
      rules={[{ required: isRequired }]}
    >
      <Input
        className="border! border-[#F9CF2F]!"
        placeholder={placeholder}
        type={type || "text"}
      />
    </Form.Item>
  );
};

export default TBSFormItemField;
