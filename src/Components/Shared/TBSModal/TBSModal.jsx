import { Modal } from "antd";
import React from "react";

const TBSModal = ({ title, isModalOpen, body, handleCancel }) => {
  return (
    <Modal
      title={title}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      {body}
    </Modal>
  );
};

export default TBSModal;
