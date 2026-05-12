import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../apis/ProductApi";

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Unable to load products", error);
      alert("Failed to load products. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete product. Check the console for details.");
    }
  };

  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="fixed top-0 w-full bg-white shadow z-50">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl italic">LUXE Admin</h1>
            <p className="text-gray-500 text-sm">Manage inventory, edit product details, and delete items.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/add-product")}
              className="rounded-full bg-black px-4 py-2 text-white text-sm hover:bg-gray-900"
            >
              + Add Product
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 px-6 max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Product Inventory</h2>
          <p className="text-gray-500 text-sm">
            Manage your products
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 border-b text-sm font-semibold text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 hidden md:block">Price</div>
            <div className="col-span-2 hidden md:block">Stock</div>
            <div className="col-span-4 md:col-span-2 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="px-6 py-10 text-center text-gray-500">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-500">
              No products found. Click the button above to add your first item.
            </div>
          ) : (
            products.map((p) => (
              <div key={p.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b hover:bg-gray-50 items-center">
                <div className="col-span-6 flex items-center gap-4">
                  <img
                    src={p.image || "https://via.placeholder.com/120"}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{p.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {p.sku || "N/A"}</p>
                  </div>
                </div>

                <div className="col-span-2 hidden md:block text-gray-700">${p.price.toFixed(2)}</div>
                <div className="col-span-2 hidden md:block text-gray-700">{p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}</div>

                <div className="col-span-4 md:col-span-2 flex justify-end gap-3">
                  <button onClick={() => editProduct(p.id)} className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

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