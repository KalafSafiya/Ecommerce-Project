import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load all products
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // 🔹 Delete product
  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure?")) return;

    fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  };

  // 🔹 Edit product
  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white shadow z-50">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <h1 className="text-xl italic">LUXE Admin</h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-24 px-6 max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Product Inventory</h2>
          <p className="text-gray-500 text-sm">
            Manage your products
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow overflow-hidden">

          {/* HEADER ROW */}
          <div className="grid grid-cols-12 px-6 py-3 border-b text-sm font-semibold text-gray-500">
            <div className="col-span-7">Product</div>
            <div className="col-span-2 hidden md:block">Stock</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {/* PRODUCT LIST */}
          {products.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 px-6 py-4 border-b hover:bg-gray-50"
            >
              {/* PRODUCT INFO */}
              <div className="col-span-7 flex items-center gap-4">
                <img
                  src={p.image || "https://via.placeholder.com/100"}
                  alt={p.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-sm text-gray-500">
                    SKU: {p.sku || "N/A"}
                  </p>
                </div>
              </div>

              {/* STOCK */}
              <div className="col-span-2 hidden md:flex items-center">
                <span className="text-sm">
                  {p.stock > 0 ? `${p.stock} In Stock` : "Out of Stock"}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="col-span-3 flex justify-end gap-3">
                <button
                  onClick={() => editProduct(p.id)}
                  className="text-blue-500"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-500"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* ADD PRODUCT BUTTON */}
      <button
        onClick={() => navigate("/add-product")}
        className="fixed bottom-8 right-8 bg-black text-white px-5 py-3 rounded-full shadow-lg"
      >
        + Add Product
      </button>
    </div>
  );
}

export default Admin;