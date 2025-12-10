import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const TBSPassword = ({ formRegister, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label className="label">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...formRegister("Password", { required: true })}
          className="input input-bordered w-full pr-10"
          placeholder="Password"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
          ) : (
            <AiOutlineEye className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
      {errors.Password && (
        <span className="text-red-500">
          {errors.Password.type === "required"
            ? "This field is required."
            : "There is an error"}
        </span>
      )}
    </div>
  );
};

export default TBSPassword;
