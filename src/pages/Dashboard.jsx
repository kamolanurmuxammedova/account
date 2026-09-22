import React, { useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import CalendarComponent from "../components/Calendar";
import Statistics from "../components/Statistics";
import { Alert, Progress } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2390, pv: 3800 },
];

export default function Dashboard() {
  const realToken = localStorage.getItem("accessToken1");
  const navigate = useNavigate();
 useEffect(() => {
   if (!realToken) {
    navigate("/");
  } else if (realToken) {
    navigate("/dashboard");
  } else {
    navigate("/");
  }
 } , [realToken, navigate])

  return (
    <div>
      <h1
        style={{
          fontSize: 30,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        Dashboard
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: 24,
        }}
      >
        Welcome to your admin dashboard
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px",
          gap: 24,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Statistics
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />

                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />

                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />

              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
       

          <Statistics />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Alert />

        <div style={{ marginTop: 20 }}>
          <Progress />
        </div>
      </div>
    </div>
  );
}
