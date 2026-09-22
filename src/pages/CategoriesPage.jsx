import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getSafeImage, FALLBACK_IMAGE } from "../utils/getSafeImage"; // поправь путь под свою структуру

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Выбранная категория для фильтра

  const API = "https://api.escuelajs.co/api/v1";

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories?limit=100`, {
        timeout: 15000,
      });

      if (Array.isArray(response.data)) {
        const validCategories = response.data.filter((category) => {
          const name = category.name ? category.name.toLowerCase() : "";
          if (name.includes("test")) return false;
          return true;
        });

        setCategories(validCategories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Kategoriyalarni olishda xatolik!");
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API}/products?limit=50`, {
        timeout: 15000,
      });

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Mahsulotlarni olishda xatolik!");
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  // Фильтрация продуктов по выбранной категории
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category?.id === Number(selectedCategory))
    : products;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/categories/${category.id}`)}
              className="cursor-pointer rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition bg-white"
            >
              <img
                src={getSafeImage(category.image) || FALLBACK_IMAGE}
                alt={category.name}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // чтобы не зациклиться, если и фолбэк не загрузится
                  e.target.src = FALLBACK_IMAGE;
                }}
              />

              <div className="p-3 flex items-center justify-between">
                <span className="font-medium truncate">
                  {category.name}
                </span>

                <span className="text-xs text-gray-400">
                  ID: {category.id}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No categories found
          </div>
        )}
      </div>

      {/* Заголовок и селект без кнопки "Сбросить" */}
      <div className="flex items-center justify-between mt-10 mb-6">
        <h1 className="text-2xl font-bold">Popular products:</h1>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Сетка продуктов */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="cursor-pointer rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition bg-white flex flex-col justify-between"
            >
              <img
                src={
                  (product.images && getSafeImage(product.images[0])) ||
                  FALLBACK_IMAGE
                }
                alt={product.title}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />  

              <div className="p-3 flex flex-col gap-2">
                <span className="font-medium truncate text-sm">
                  {product.title}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-600 font-bold text-sm">
                    ${product.price}
                  </span>
                  <span className="text-xs text-gray-400">
                    ID: {product.id}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            В этой категории нет продуктов
          </div>
        )}
      </div>
    </div>
  );
}
