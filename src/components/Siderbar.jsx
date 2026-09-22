import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  FileOutlined,
  SettingOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <AppstoreOutlined />,
    label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
  },
  {
    key: "2",
    icon: <BarChartOutlined />,
    label: <NavLink to={"/products"}>Products</NavLink>,
  },
  {
    key: "7",
    icon: <TagsOutlined />,
    label: <NavLink to={"/categories"}>Categories</NavLink>,
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: <NavLink to={"/users"}>Users</NavLink>,
  },
  {
    key: "4",
    icon: <FileOutlined />,
    label: <NavLink to={"/posts"}>Posts</NavLink>,
  },
  {
    key: "5",
    icon: <UserOutlined />,
    label: <NavLink to={"/carts"}>Carts</NavLink>,
  },
  {
    key: "6",
    icon: <SettingOutlined />,
    label: <NavLink to={"/settings"}>Settings</NavLink>,
  },
];

export default function Sidebar() {
  return (
    <Sider
      width={250}
      style={{
        minHeight: "100vh",
        background: "#111827",
      }}
    >
      <div
        style={{
          height: 70,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "#1677ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          A
        </div>

        AdminPanel
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          marginTop: 18,
          background: "transparent",
          border: "none",
        }}
      />
    </Sider>
  );
}