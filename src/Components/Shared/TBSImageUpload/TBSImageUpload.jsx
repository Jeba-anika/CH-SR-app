import { message, Upload } from "antd";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const TBSImageUpload = ({ fileList, setFileList }) => {
  //const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Only image files are allowed!");
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false; // prevent auto upload
    },
    fileList,
    onRemove: () => setFileList([]),
    maxCount: 1,
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div>
      <Upload
        {...props}
        className="avatar-uploader"
        name="image"
        listType="picture-card"
      >
        {fileList[0] ? (
          <img
            draggable={false}
            src={fileList[0] && URL.createObjectURL(fileList[0])}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default TBSImageUpload;
