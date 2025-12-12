import React from "react";

const TBSButton = ({ text, onClickFn, btnType }) => {
  return (
    <button
      type={btnType || "button"}
      onClick={() => onClickFn()}
      className="btn bg-[#f9cf2f] mt-4"
    >
      {text}
    </button>
  );
};

export default TBSButton;
