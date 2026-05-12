import { useEffect, useState } from "react";

const emptyProduct = {
    category: "",
    name: "",
    price: 0,
    image: "",
    description: "",
    stock: 0,
    sku: "",
};

export default function ProductForm({ title, product, onSubmit, submitting }) {
    const [form, setForm] = useState({ ...emptyProduct, ...product });

    useEffect(() => {
        setForm({ ...emptyProduct, ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value || 0) : name === "stock" ? parseInt(value || "0", 10) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto bg-white shadow rounded-3xl p-8">
                <h1 className="text-3xl font-semibold mb-6">{title}</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Product Name</span>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Category</span>
                            <input
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Price</span>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Stock</span>
                            <input
                                name="stock"
                                type="number"
                                min="0"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">SKU</span>
                        <input
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Image URL</span>
                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Description</span>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={5}
                            className="mt-2 w-full rounded-3xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-black text-white py-3 text-lg transition hover:bg-gray-900 disabled:opacity-50"
                    >
                        {submitting ? "Saving..." : "Save Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}
