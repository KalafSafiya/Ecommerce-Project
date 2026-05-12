import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../apis/ProductApi";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(item =>
      item.id === cartItem.id &&
      item.size === cartItem.size &&
      item.color === cartItem.color
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-32">

      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 fixed w-full top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <span
            onClick={() => navigate("/catalog")}
            className="text-2xl font-serif italic cursor-pointer"
          >
            LUXE
          </span>

          <div className="flex gap-6 text-sm font-medium">
            <span onClick={() => navigate("/catalog")} className="cursor-pointer">Shop</span>
            <span onClick={() => navigate("/cart")} className="cursor-pointer">Cart</span>
          </div>
        </div>
      </header>

      <div className="pt-24 max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* IMAGE */}
          <div className="lg:col-span-7">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover shadow-xl"
            />
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-5">

            <p className="text-sm text-gray-500 uppercase">
              {product.category}
            </p>

            <h1 className="text-4xl font-serif mt-2">
              {product.name}
            </h1>

            <p className="text-2xl mt-4">
              ${product.price}
            </p>

            {/* COLOR */}
            <div className="mt-8">
              <p className="text-sm font-medium">Color: {selectedColor}</p>

              <div className="flex gap-3 mt-2">
                {["Black", "Beige", "White"].map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 border ${selectedColor === color ? "bg-black text-white" : ""
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="mt-6">
              <p className="text-sm font-medium">Size</p>

              <div className="flex gap-3 mt-2">
                {["S", "M", "L", "XL"].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border ${selectedSize === size ? "bg-black text-white" : ""
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-3 mt-8"
            >
              Add to Cart
            </button>

            {/* DESCRIPTION */}
            <p className="mt-6 text-gray-600">
              {product.description}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;