import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../apis/ProductApi";

export default function ProductCatalog() {

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log("Error loading products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-surface text-on-surface min-h-screen">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white shadow-sm border-b z-50">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">

          <span
            className="text-2xl font-serif italic tracking-widest cursor-pointer"
            onClick={() => navigate("/catalog")}
          >
            LUXE
          </span>

          <div className="flex gap-6 items-center text-sm font-medium">
            <span onClick={() => navigate("/catalog")} className="cursor-pointer hover:text-gray-500">Shop</span>
            <span onClick={() => navigate("/profile")} className="cursor-pointer hover:text-gray-500">Profile</span>
            <span onClick={() => navigate("/cart")} className="cursor-pointer hover:text-gray-500">Cart</span>
          </div>

        </div>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto">

        {/* SEARCH */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border-b p-3 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >

              <div className="aspect-[3/4] overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <p className="text-xs text-gray-400">
                {product.category}
              </p>

              <h3 className="font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-600">
                ${product.price}
              </p>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}