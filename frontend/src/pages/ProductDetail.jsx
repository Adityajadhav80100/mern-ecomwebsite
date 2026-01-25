import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../api/axios";

function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/Product/${id}`);
      setProductDetail(res.data.product);
    } catch (err) {
      console.log("error in loading product detail", err);
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
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <div className="h-96 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
          <img
            src={productDetail.image}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x300?text=No+Image";
            }}
            className="max-h-full max-w-full object-contain"
            alt={productDetail.title}
          />
        </div>

        <h1 className="text-2xl font-bold mb-2">
          {productDetail.title}
        </h1>

        <p className="text-slate-400 mb-4">
          {productDetail.description}
        </p>

        <p className="text-blue-400 font-bold text-xl">
          ₹{productDetail.price}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
