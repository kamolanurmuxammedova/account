import React from "react";
import { useParams, Link } from "react-router-dom";
import useGet from "../hooks/useGet";

function SingleCategoryPage() {
  const { id } = useParams();
  const [category] = useGet("categories", id);

  // Shu category'ga tegishli productlarni olish
  const [allProducts] = useGet("products");
  const categoryProducts = Array.isArray(allProducts)
    ? allProducts.filter((p) => p.category?.id === Number(id))
    : [];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <Link to="/categories" className="mb-6 inline-block text-blue-600 hover:underline">
          ← Back to Categories
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="relative h-64 w-full">
            <img
              src={category?.image}
              alt={category?.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end bg-black/30 p-6">
              <h1 className="text-3xl font-bold text-white">
                {category?.name}
              </h1>
            </div>
          </div>

          <div className="p-6">
            <p className="mb-2 text-sm text-slate-400">ID: {category?.id}</p>

            <h2 className="mt-6 mb-4 text-xl font-bold text-slate-900">
              Products in this category ({categoryProducts.length})
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {categoryProducts.map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="rounded-xl border border-slate-200 p-3 transition hover:shadow-md"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="mb-2 h-24 w-full rounded-lg object-cover"
                  />
                  <p className="truncate text-sm font-medium text-slate-800">
                    {product.title}
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    ${product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCategoryPage;
