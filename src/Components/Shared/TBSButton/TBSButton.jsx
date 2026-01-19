import { Spin } from "antd";
import React from "react";

const TBSButton = ({ text, onClickFn, btnType, style, isLoading = false }) => {
  return (
    <button
      type={btnType || "button"}
      onClick={() => onClickFn && onClickFn()}
      className={`btn bg-[#f9cf2f] mt-4 ${style}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spin /> {text}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default TBSButton;
