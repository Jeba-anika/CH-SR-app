import React from "react";

const TBSButton = ({ text, onClickFn, btnType, style }) => {
  return (
    <button
      type={btnType || "button"}
      onClick={() => onClickFn()}
      className={`btn bg-[#f9cf2f] mt-4 ${style}`}
    >
      {text}
    </button>
  );
};

export default TBSButton;
