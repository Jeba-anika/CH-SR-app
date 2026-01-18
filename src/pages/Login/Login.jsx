import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { auth, setAuth } = useAuth();
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
        navigate("/create-orders", { replace: true });
      } else {
        setIsLoginLoading(false);
        throw new Error(res.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-10">
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
