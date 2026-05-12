import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../apis/ProductApi";
import ProductForm from "./ProductForm";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
                alert("Unable to load product.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleSubmit = async (updatedProduct) => {
        setSubmitting(true);
        try {
            await updateProduct(id, updatedProduct);
            alert("Product updated successfully.");
            navigate("/admin");
        } catch (error) {
            console.error(error);
            alert("Failed to update product. Check the console for details.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading product...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Edit Product</h1>
                    <button
                        onClick={() => navigate("/admin")}
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        Back to Admin
                    </button>
                </div>
            </header>

            <main className="pt-24 px-6">
                <ProductForm
                    title="Edit Product"
                    product={product}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                />
            </main>
        </div>
    );
}
