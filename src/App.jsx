import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import CategoriesPage from './pages/CategoriesPage'
import SingleCategoryPage from './pages/SingleCategoryPage'
import UsersPage from './pages/UsersPage'
import PostsPage from './pages/PostsPage'
import CartsPage from './pages/CartsPage'
import Settings from './pages/Settings'

export default function App() {
  const [realToken, setrealToken] = useState(
    localStorage.getItem("accessToken1") || null
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout realToken={realToken} setrealToken={setrealToken} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<SingleCategoryPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/carts" element={<CartsPage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
