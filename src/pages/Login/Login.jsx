import { useState } from "react";
import TBSInput from "../../Components/Shared/TBSInput/TBSInput";
import { useForm } from "react-hook-form";

import TBSPassword from "../../Components/Shared/TBSPassword/TBSPassword";
import { Navigate } from "react-router";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    Navigate("/create-orders");
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign in to your Account!</h1>
          <p className="py-6">
            Enter your phone number and password to access your account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
        >
          <div className="card-body">
            <fieldset className="fieldset">
              <TBSInput
                formRegister={register}
                label={"Email"}
                name="email"
                inputClsName={"input w-full"}
                inputType={"email"}
                labelClsName={"label"}
                placeholder={"Email"}
                errors={errors}
                isRequired={true}
              ></TBSInput>
              <TBSPassword
                formRegister={register}
                errors={errors}
              ></TBSPassword>
              <TBSButton text={"Login"} />
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
