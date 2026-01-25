import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const TBSImageUpload = ({ fileList, setFileList }) => {
  const props = {
    name: "image",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Only image files are allowed!");
        return Upload.LIST_IGNORE;
      }
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          originFileObj: file,
        },
      ]);

      return false; // prevent auto upload
    },
    fileList: fileList.length ? [fileList[0]] : [],
    onRemove: () => setFileList([]),
    maxCount: 1,
    listType: "picture-card",
  };

  return (
    <div className="!h-20">
      <Upload
        {...props}
        className="avatar-uploader"
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: false,
        }}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </div>
  );
};

export default TBSImageUpload;
