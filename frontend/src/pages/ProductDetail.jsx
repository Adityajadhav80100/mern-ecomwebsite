import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../api/axios";
import dummyProducts from "../data/dummyProducts";

function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const fallbackImage =
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=640&q=80";
  const fallbackProduct = dummyProducts.find((product) => product._id === id);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/Product/${id}`);
      if (res.data.product) {
        setProductDetail(res.data.product);
      } else if (fallbackProduct) {
        setProductDetail(fallbackProduct);
      }
    } catch (err) {
      console.log("error in loading product detail", err);
      if (fallbackProduct) {
        setProductDetail(fallbackProduct);
      }
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (!productDetail) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-white p-8 shadow-xl lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex items-center justify-center rounded-3xl bg-gray-50 p-6 shadow-inner">
            <img
              src={productDetail.image || fallbackImage}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
              className="w-full max-w-md object-contain rounded-2xl"
              alt={productDetail.title}
            />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Featured product
            </p>
            <h1 className="text-3xl font-semibold text-gray-900">
              {productDetail.title}
            </h1>
          </div>

          <p className="text-3xl font-bold text-blue-600">
            ₹{productDetail.price}
          </p>

          <div className="space-y-2 rounded-2xl bg-gray-50 p-5 text-gray-600 shadow-sm">
            <p className="text-lg font-semibold text-gray-800">
              Description
            </p>
            <p className="text-sm leading-relaxed">
              {productDetail.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
