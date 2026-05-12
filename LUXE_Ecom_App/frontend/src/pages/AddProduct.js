import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../apis/ProductApi";
import ProductForm from "./ProductForm";

export default function AddProduct() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (product) => {
        setSubmitting(true);
        try {
            await addProduct(product);
            alert("Product added successfully.");
            navigate("/admin");
        } catch (error) {
            console.error(error);
            alert("Failed to add product. Check the console for details.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Add Product</h1>
                    <button
                        onClick={() => navigate("/admin")}
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        Back to Admin
                    </button>
                </div>
            </header>

            <main className="pt-24 px-6">
                <ProductForm title="Create New Product" onSubmit={handleSubmit} submitting={submitting} />
            </main>
        </div>
    );
}
