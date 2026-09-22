import React, { useState } from "react";
import { Modal, Tabs, Form, Input, Button, message, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

const API_BASE = "https://api.escuelajs.co/api/v1";
const DEFAULT_AVATAR = "https://api.lorem.space/image/face?w=640&h=480";

/**
 * Props:
 *  - open: boolean            -> controls modal visibility
 *  - onClose: () => void      -> called when modal should close
 *  - setrealToken: (token) => void -> called on successful login/register (saves token to App state)
 */
const AuthModal = ({ open, onClose, setrealToken }) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const saveSession = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken1", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken1", refreshToken);
    }
    setrealToken(accessToken);
  };

  const handleLogin = async (values) => {
    setLoginLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      saveSession(res.data.access_token, res.data.refresh_token);
      message.success("Вы успешно вошли!");
      loginForm.resetFields();
      onClose();
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || "Неверный email или пароль";
      message.error(Array.isArray(errMsg) ? errMsg.join(", ") : errMsg);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setRegisterLoading(true);
    try {
      // 1. Создаём пользователя
      await axios.post(`${API_BASE}/users/`, {
        name: values.name,
        email: values.email,
        password: values.password,
        avatar: values.avatar?.trim() || DEFAULT_AVATAR,
      });

      // 2. Регистрация не возвращает токен -> сразу логинимся тем же email/паролем
      const loginRes = await axios.post(`${API_BASE}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      saveSession(loginRes.data.access_token, loginRes.data.refresh_token);
      message.success("Аккаунт создан, вы вошли!");
      registerForm.resetFields();
      onClose();
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || "Не удалось зарегистрироваться";
      message.error(Array.isArray(errMsg) ? errMsg.join(", ") : errMsg);
    } finally {
      setRegisterLoading(false);
    }
  };

  const items = [
    {
      key: "login",
      label: "Вход",
      children: (
        <Form
          form={loginForm}
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
          style={{ marginTop: 12 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Введите email" },
              { type: "email", message: "Некорректный email" },
            ]}
          >
            <Input size="large" placeholder="john@mail.com" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password size="large" placeholder="••••••••" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loginLoading}
              style={{
                height: 48,
                borderRadius: 10,
                fontWeight: 600,
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                border: "none",
              }}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "register",
      label: "Регистрация",
      children: (
        <Form
          form={registerForm}
          layout="vertical"
          onFinish={handleRegister}
          autoComplete="off"
          style={{ marginTop: 12 }}
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input size="large" placeholder="Ваше имя" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Введите email" },
              { type: "email", message: "Некорректный email" },
            ]}
          >
            <Input size="large" placeholder="you@example.com" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: "Введите пароль" },
              { min: 4, message: "Минимум 4 символа" },
            ]}
          >
            <Input.Password size="large" placeholder="••••••••" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            label="Ссылка на аватар (необязательно)"
            name="avatar"
          >
            <Input size="large" placeholder="https://..." style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={registerLoading}
              style={{
                height: 48,
                borderRadius: 10,
                fontWeight: 600,
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                border: "none",
              }}
            >
              Создать аккаунт
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      styles={{ body: { padding: "8px 8px 16px" } }}
    >
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <Avatar size={56} icon={<UserOutlined />} style={{ background: "linear-gradient(90deg, #667eea, #764ba2)" }} />
        <h2 style={{ margin: "12px 0 0", fontSize: 22, fontWeight: 700 }}>
          {activeTab === "login" ? "С возвращением" : "Создать аккаунт"}
        </h2>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={items}
      />
    </Modal>
  );
};

export default AuthModal;
