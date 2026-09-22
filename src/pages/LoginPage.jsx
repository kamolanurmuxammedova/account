import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({setrealToken}) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (res.data.accessToken) {
        localStorage.setItem("accessToken1", res.data.accessToken);
setrealToken(res.data.accessToken)
      

        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);

   
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "700",
              color: "#1f2937",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            Login to your account
          </p>
        </div>

        <Form
          name="login"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your username"
              style={{
                borderRadius: "10px",
                height: "48px",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              style={{
                borderRadius: "10px",
                height: "48px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{
              marginBottom: "20px",
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                height: "48px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                border: "none",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            marginBottom: 0,
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{
              color: "#667eea",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
