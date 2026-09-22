import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getSafeImage } from "../utils/getSafeImage"; // поправь путь под свою структуру

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    image: "",
  });

  const timerRef = useRef(null);

  const API = "https://api.escuelajs.co/api/v1";

  const getProducts = async (value = "") => {
    try {
      let url = `${API}/products`;

      if (value.trim()) {
        url = `${API}/products/?title=${encodeURIComponent(
          value.trim()
        )}`;
      } else {
        url = `${API}/products?limit=100&offset=0`;
      }

      const response = await axios.get(url, {
        timeout: 15000,
      });

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ma'lumotlarni olishda xatolik!");
    }
  };

  useEffect(() => {
    getProducts();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      getProducts(value);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        categoryId: Number(formData.categoryId),
        images: [formData.image],
      };

      const response = await axios.post(
        `${API}/products`,
        newProduct,
        {
          timeout: 15000,
        }
      );

      setProducts((prev) => [response.data, ...prev]);

      setFormData({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        image: "",
      });

      setShowModal(false);

      toast.success("New product added!");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Mahsulot qo'shishda xatolik!");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}`, {
        timeout: 15000,
      });

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      toast.success("Product deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Mahsulotni o'chirishda xatolik!");
    }
  };

  const ProductImage = ({ images, title }) => {
    // Сразу фильтруем мёртвые/битые ссылки (например via.placeholder.com),
    // чтобы браузер даже не пытался их грузить -> меньше ошибок в консоли
    const safeImages = Array.isArray(images)
      ? images.map(getSafeImage).filter(Boolean)
      : [];

    const [imageIndex, setImageIndex] = useState(0);
    const [error, setError] = useState(false);

    if (safeImages.length === 0 || error) {
      return (
        <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
          No Image
        </div>
      );
    }

    const image = safeImages[imageIndex];

    return (
      <img
        src={image}
        alt={title}
        className="w-[70px] h-[70px] object-cover rounded-lg"
        onError={() => {
          if (imageIndex < safeImages.length - 1) {
            setImageIndex((prev) => prev + 1);
          } else {
            setError(true);
          }
        }}
      />
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">
                Image
              </th>

              <th className="border p-3 text-left">
                Title
              </th>

              <th className="border p-3 text-left">
                ID
              </th>

              <th className="border p-3 text-left">
                Price
              </th>

              <th className="border p-3 text-left">
                Category
              </th>

              <th className="border p-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">
                    <ProductImage
                      images={product.images}
                      title={product.title}
                    />
                  </td>

                  <td className="border p-3">
                    <div className="max-w-[250px] truncate">
                      {product.title}
                    </div>
                  </td>

                  <td className="border p-3">
                    {product.id}
                  </td>

                  <td className="border p-3">
                    ${product.price}
                  </td>

                  <td className="border p-3">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {product.category?.name ||
                        "No category"}
                    </span>
                  </td>

                  <td className="border p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/products/${product.id}`)
                        }
                        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border p-10 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">
                Add Product
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={addProduct}
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              <input
                type="number"
                name="categoryId"
                placeholder="Category ID"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 py-3 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
