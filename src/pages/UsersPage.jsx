import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const API = "https://api.escuelajs.co/api/v1";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    avatar: "",
  });

  const timerRef = useRef(null);

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/users?limit=60`,
        {
          timeout: 15000,
        }
      );

      if (Array.isArray(response.data)) {
        setAllUsers(response.data);
        setUsers(response.data);
      } else {
        setAllUsers([]);
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
      setAllUsers([]);
      setUsers([]);
      toast.error("Ma'lumotlarni olishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();

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
        setUsers(allUsers);
        return;
      }

      const filteredUsers = allUsers.filter((user) =>
        user.name?.toLowerCase().includes(searchValue)
      );

      setUsers(filteredUsers);
    }, 1000);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/users/${id}`, {
        timeout: 15000,
      });

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      setAllUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      toast.success("Foydalanuvchi muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.log(error);
      toast.error("Foydalanuvchini o'chirishda xatolik!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.avatar
    ) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      setAdding(true);

      const response = await axios.post(
        `${API}/users`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          avatar: formData.avatar,
        },
        {
          timeout: 15000,
        }
      );

      setAllUsers((prev) => [
        response.data,
        ...prev,
      ]);

      setUsers((prev) => [
        response.data,
        ...prev,
      ]);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
        avatar: "",
      });

      setShowModal(false);

      toast.success("Yangi foydalanuvchi qo'shildi!");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Foydalanuvchi qo'shishda xatolik!");
    } finally {
      setAdding(false);
    }
  };

  const UserImage = ({ avatar, name }) => {
    const [imageError, setImageError] = useState(false);

    if (!avatar || imageError) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-500">
          {name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      );
    }

    return (
      <img
        src={avatar}
        alt={name}
        className="h-12 w-12 rounded-full object-cover"
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Users
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Barcha foydalanuvchilar
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by name..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 sm:w-[280px]"
            />

            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              + Add User
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Role
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Created
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-200 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <UserImage
                          avatar={user.avatar}
                          name={user.name}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-medium text-gray-800">
                          {user.name}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {user.creationAt
                          ? new Date(
                              user.creationAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() =>
                            deleteUser(user.id)
                          }
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      User topilmadi
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
                Add User
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-400 transition hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={addUser}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
              >
                <option value="customer">
                  Customer
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Preview"
                  className="h-20 w-20 rounded-full object-cover"
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
                  {adding ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}