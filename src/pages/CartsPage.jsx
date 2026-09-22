
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const API = "https://api.escuelajs.co/api/v1";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const timerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const getCategories = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/categories?limit=80`,
        {
          timeout: 15000,
        }
      );

      if (Array.isArray(response.data)) {
        setAllCategories(response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ma'lumotlarni olishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const searchValue = value.trim().toLowerCase();

      if (!searchValue) {
        setCategories(allCategories);
        return;
      }

      const filtered = allCategories.filter(
        (category) =>
          category.name?.toLowerCase().includes(searchValue) ||
          category.slug?.toLowerCase().includes(searchValue)
      );

      setCategories(filtered);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addCategory = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      setAdding(true);

      const response = await axios.post(
        `${API}/categories`,
        {
          name: formData.name,
          image: formData.image,
        },
        {
          timeout: 15000,
        }
      );

      const newCategory = response.data;

      setAllCategories((prev) => [
        newCategory,
        ...prev,
      ]);

      setCategories((prev) => [
        newCategory,
        ...prev,
      ]);

      setFormData({
        name: "",
        image: "",
      });

      setShowModal(false);

      toast.success("Yangi category qo'shildi!");
    } catch (error) {
      console.log(error);
      toast.error("Category qo'shishda xatolik!");
    } finally {
      setAdding(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setDeletingId(id);

      try {
        await axios.delete(`${API}/categories/${id}`, {
          timeout: 15000,
        });
      } catch (error) {
        console.log("API delete error:", error);
      }

      setAllCategories((prev) =>
        prev.filter((category) => category.id !== id)
      );

      setCategories((prev) =>
        prev.filter((category) => category.id !== id)
      );

      toast.success("Category o'chirildi!");
    } catch (error) {
      console.log(error);
      toast.error("Category o'chirishda xatolik!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Categories
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Barcha kategoriyalar
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search category..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 sm:w-[280px]"
            />

            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              + Add Category
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                    Slug
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                    Created
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                    Updated
                  </th>

                  <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-t border-gray-200 transition hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {category.id}
                      </td>

                      <td className="px-4 py-4">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-14 w-14 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </td>

                      <td className="px-4 py-4 font-medium text-gray-800">
                        {category.name}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                          {category.slug}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        {category.creationAt
                          ? new Date(
                              category.creationAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        {category.updatedAt
                          ? new Date(
                              category.updatedAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() =>
                              deleteCategory(category.id)
                            }
                            disabled={
                              deletingId === category.id
                            }
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === category.id
                              ? "..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      Category topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Add Category
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-400 transition hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={addCategory}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-24 w-24 rounded-lg object-cover"
                />
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={adding}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {adding ? "Adding..." : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
