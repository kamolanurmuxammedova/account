import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Avatar, Button } from "antd";
import { UserOutlined, HeartOutlined, ShoppingOutlined, SearchOutlined } from "@ant-design/icons";
import { Outlet, Link, useLocation } from "react-router-dom";
import axios from "axios";
import AuthModal from "./AuthModal"; // поправь путь под свою структуру

const API_BASE = "https://api.escuelajs.co/api/v1";
const { Header, Content } = AntLayout;

export default function Layout({ realToken, setrealToken }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!realToken) {
      setUser(null);
      return;
    }
    axios
      .get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${realToken}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [realToken]);

  return (
    <AntLayout style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Верхняя черная полоска с акцией */}
      <div className="bg-black text-white text-[11px] tracking-wider text-center py-2 px-4 font-light">
        COMPLIMENTARY WORLDWIDE SHIPPING ON ORDERS OVER $150 &nbsp;|&nbsp; FREE RETURNS WITHIN 30 DAYS
      </div>

      {/* Верхнее меню (Хедер) */}
      <Header
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #eaeaea",
          padding: "0 30px",
          height: "75px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          lineHeight: "normal"
        }}
      >
        {/* Логотип сайта */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold tracking-widest text-black">
            NOIRÉ
          </Link>
        </div>

        {/* Навигационные ссылки */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider">
          <Link
            to="/"
            className={`transition-colors hover:text-black py-2 ${isActive("/") ? "text-black border-b-2 border-black" : "text-gray-400"}`}
          >
            HOME
          </Link>
          <Link
            to="/products"
            className={`transition-colors hover:text-black py-2 ${isActive("/products") ? "text-black border-b-2 border-black" : "text-gray-400"}`}
          >
            SHOP
          </Link>
          <Link
            to="/categories"
            className={`transition-colors hover:text-black py-2 ${isActive("/categories") ? "text-black border-b-2 border-black" : "text-gray-400"}`}
          >
            CATEGORIES
          </Link>
          <Link
            to="/new-arrivals"
            className="text-gray-400 hover:text-black transition-colors py-2"
          >
            NEW ARRIVALS
          </Link>
        </nav>

        {/* Правый блок: Поиск и иконки */}
        <div className="flex items-center gap-3">
          {/* Инпут поиска */}
          <div
            className="hidden lg:flex items-center rounded-full bg-gray-50 transition-colors"
            style={{
              border: "1px solid #ececec",
              padding: "8px 14px",
              minWidth: 190,
            }}
          >
            <SearchOutlined style={{ color: "#9ca3af", fontSize: 13, marginRight: 8 }} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-xs flex-1 text-gray-700 placeholder-gray-400"
            />
            <span
              className="text-[10px] text-gray-400 ml-2"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 5,
                padding: "1px 5px",
                fontFamily: "monospace",
              }}
            >
              ⌘K
            </span>
          </div>

          {/* Иконки и профиль */}
          <div className="flex items-center gap-1">
            <button
              className="flex items-center justify-center rounded-full transition-colors"
              style={{ width: 38, height: 38, color: "#374151" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <HeartOutlined style={{ fontSize: 17 }} />
            </button>
            <button
              className="flex items-center justify-center rounded-full transition-colors"
              style={{ width: 38, height: 38, color: "#374151" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <ShoppingOutlined style={{ fontSize: 17 }} />
            </button>

            {/* Вход / профиль */}
            {realToken ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginLeft: 6,
                  padding: "5px 12px 5px 6px",
                  borderRadius: 999,
                }}
              >
                <Avatar
                  size={30}
                  src={user?.avatar}
                  icon={!user?.avatar && <UserOutlined />}
                  style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    flexShrink: 0,
                    boxShadow: "0 0 0 2px #fff, 0 0 0 3px #ececec",
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1f2937",
                    maxWidth: 110,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user?.name || "..."}
                </span>
              </div>
            ) : (
              <Button
                onClick={() => setAuthOpen(true)}
                style={{
                  marginLeft: 6,
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  height: 36,
                  paddingInline: 20,
                  border: "none",
                  color: "#fff",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  boxShadow: "0 2px 8px rgba(118, 75, 162, 0.25)",
                }}
              >
                Войти
              </Button>
            )}
          </div>
        </div>
      </Header>

      {/* Основной контент */}
      <Content style={{ background: "#fff", minHeight: "calc(100vh - 110px)", padding: "24px 40px" }}>
        <Outlet />
      </Content>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        setrealToken={setrealToken}
      />
    </AntLayout>
  );
}
