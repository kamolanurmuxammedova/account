import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function SingleProductPage() {
  const { id } = useParams();
  const [data] = useGet("products", id);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* IMAGES */}
            <div className="bg-slate-100 p-5 md:p-8">

              {/* Main Slider */}
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                className="mb-4 overflow-hidden rounded-2xl"
              >
                {data?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={data?.title}
                      className="h-[420px] w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnail Slider */}
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={3}
                watchSlidesProgress
                className="thumbs-slider"
              >
                {data?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={data?.title}
                      className="h-24 w-full cursor-pointer rounded-lg object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* INFO */}
            <div className="p-5 md:p-8">
              <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                {data?.category?.name}
              </span>

              <h1 className="mt-4 text-3xl font-bold text-slate-900">
                {data?.title}
              </h1>

              <span className="text-sm text-slate-500">
                4.8 · 124 reviews
              </span>

              <div className="mt-7 flex items-center gap-3">
                <span className="text-4xl font-bold text-slate-900">
                  ${data?.price}
                </span>

                <span className="rounded-lg bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                  In stock
                </span>
              </div>

              <p className="mt-7 leading-7 text-slate-600">
                {data?.description}
              </p>

              <div className="my-7 h-px bg-slate-200" />

              <div className="flex gap-3">
                <button className="flex-1 rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800">
                  Add to cart
                </button>

                <button className="rounded-xl border border-slate-200 px-6 py-4 text-2xl transition hover:bg-slate-100">
                  ♡
                </button>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3 text-center text-sm text-slate-600">
                <div className="rounded-xl bg-slate-50 p-3">
                  🚚
                  <div className="mt-1">Fast delivery</div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  🔒
                  <div className="mt-1">Secure payment</div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  ↩️
                  <div className="mt-1">Easy returns</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
