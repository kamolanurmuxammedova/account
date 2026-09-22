
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const API = "https://dummyjson.com";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const timerRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const getPosts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/posts`, {
        timeout: 15000,
      });

      setAllPosts(response.data.posts);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Ma'lumotlarni olishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();

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
        setPosts(allPosts);
        return;
      }

      const filteredPosts = allPosts.filter((post) =>
        post.title?.toLowerCase().includes(searchValue)
      );

      setPosts(filteredPosts);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPost = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.body || !formData.userId) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      setAdding(true);

      const response = await axios.post(
        `${API}/posts/add`,
        {
          title: formData.title,
          body: formData.body,
          userId: Number(formData.userId),
        },
        {
          timeout: 15000,
        }
      );

      const newPost = {
        ...response.data,
        tags: [],
        reactions: {
          likes: 0,
          dislikes: 0,
        },
        views: 0,
      };

      setAllPosts((prev) => [newPost, ...prev]);

      setPosts((prev) => [newPost, ...prev]);

      setFormData({
        title: "",
        body: "",
        userId: "",
      });

      setShowModal(false);

      toast.success("Yangi post qo'shildi!");
    } catch (error) {
      console.log(error);
      toast.error("Post qo'shishda xatolik!");
    } finally {
      setAdding(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setDeletingId(id);

      await axios.delete(`${API}/posts/${id}`, {
        timeout: 15000,
      });

      setAllPosts((prev) => prev.filter((post) => post.id !== id));

      setPosts((prev) => prev.filter((post) => post.id !== id));

      toast.success("Muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.log(error);
      toast.error("Postni o'chirishda xatolik!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
            <p className="mt-1 text-sm text-gray-500">
              Barcha postlar
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by title..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 sm:w-[260px]"
            />

            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              + Add Post
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-[5%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    ID
                  </th>

                  <th className="w-[16%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    Title
                  </th>

                  <th className="w-[22%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    Body
                  </th>

                  <th className="w-[15%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    Tags
                  </th>

                  <th className="w-[8%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    Likes
                  </th>

                  <th className="w-[9%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    Dislikes
                  </th>

                  <th className="w-[7%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    Views
                  </th>

                  <th className="w-[7%] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                    User
                  </th>

                  <th className="w-[11%] px-3 py-3 text-center text-xs font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-t border-gray-200 transition hover:bg-gray-50"
                    >
                      <td className="px-3 py-3 text-sm text-gray-600">
                        {post.id}
                      </td>

                      <td className="px-3 py-3">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {post.title}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <p className="truncate text-sm text-gray-600">
                          {post.body}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-medium text-blue-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                          {post.reactions?.likes || 0}
                        </span>
                      </td>

                      <td className="px-3 py-3">
                        <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                          {post.reactions?.dislikes || 0}
                        </span>
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600">
                        {post.views || 0}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600">
                        {post.userId}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => alert(post.body)}
                            className="rounded-md bg-blue-100 px-2 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-200"
                          >
                            View
                          </button>

                          <button
                            onClick={() => deletePost(post.id)}
                            disabled={deletingId === post.id}
                            className="rounded-md bg-red-500 px-2 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === post.id
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
                      colSpan="9"
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      Post topilmadi
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
                Add Post
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-400 transition hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={addPost} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Post title"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Post body"
                rows="5"
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

              <input
                type="number"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="User ID"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />

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
                  {adding ? "Adding..." : "Add Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

