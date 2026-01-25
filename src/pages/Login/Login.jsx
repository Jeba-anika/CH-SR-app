import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";
import TBSLogo from "../../assets/TBS logo.png";

const Login = () => {
  const { setAuth } = useAuth();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    setIsLoginLoading(true);
    try {
      const user = { ...values };
      const data = await fetch(
        "https://api.erp.seoulsourcing.com/api/dashboard-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        },
      );
      const res = await data.json();
      if (data.status === 200) {
        setIsLoginLoading(false);
        const authToken = res?.access;
        console.log(authToken);
        setAuth({ user, authToken });
        localStorage.setItem("user", JSON.stringify({ user, authToken }));
        navigate("/home", { replace: true });
      } else {
        setIsLoginLoading(false);
        throw new Error(res.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-10 pt-20 md:mx-20 lg:mx-80">
      <img src={TBSLogo} alt="TBS Logo" className="mx-auto mb-10 w-48 h-auto" />
      <div>
        <h1 className="font-bold text-2xl text-center">
          Sign in to your account
        </h1>
        <p className="font-light text-center">
          Enter your Username and Password to Login
        </p>
      </div>
      <div className="mt-10 w-full  ">
        <Form name="login" onFinish={onSubmit} autoComplete="off">
          <TBSFormItemField
            isRequired={true}
            label={"Username"}
            name={"username"}
            placeholder={"Enter your username"}
          />

          <Form.Item
            layout="vertical"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="border! border-[#F9CF2F]!"
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item label={null}>
            <TBSButton
              btnType={"submit"}
              text={"Login"}
              style={"w-full"}
              isLoading={isLoginLoading}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
