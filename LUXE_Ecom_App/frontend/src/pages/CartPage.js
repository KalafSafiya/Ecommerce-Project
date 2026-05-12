import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Initialize quantity if missing
    const initializedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCart(initializedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm z-50 py-4 px-6 fixed w-full top-0">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <span 
            onClick={() => navigate("/catalog")}
            className="text-2xl font-serif italic tracking-widest cursor-pointer"
          >
            LUXE
          </span>
          <div className="flex gap-6 items-center text-sm font-medium">
            <span onClick={() => navigate("/catalog")} className="cursor-pointer hover:text-gray-500">Shop</span>
            <span onClick={() => navigate("/profile")} className="cursor-pointer hover:text-gray-500">Profile</span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 px-6 max-w-7xl mx-auto w-full pb-20">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold mb-2">Shopping Bag</h1>
          <p className="text-gray-500">{cart.length} items in your bag</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-medium mb-4">Your bag is empty</h2>
            <button 
              onClick={() => navigate("/catalog")}
              className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm flex gap-6 items-center relative group">
                  <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || "https://via.placeholder.com/150"} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{item.category || "LUXE"}</p>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4">
                      {item.size ? `Size: ${item.size} | ` : ""} 
                      {item.color ? `Color: ${item.color}` : ""}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(index, -1)} className="px-2 text-gray-500 hover:text-black">-</button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, 1)} className="px-2 text-gray-500 hover:text-black">+</button>
                      </div>
                      <button 
                        onClick={() => removeItem(index)}
                        className="text-sm text-red-500 hover:text-red-700 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-28">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (Estimated)</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">${(subtotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate("/checkout")}
                  className="w-full py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition transform hover:scale-[1.02] shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;