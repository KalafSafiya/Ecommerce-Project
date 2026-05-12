import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load cart
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  // 🔹 Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // 🔹 Place order
  const placeOrder = () => {
    const order = {
      items: cart,
      total: total,
    };

    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then(() => {
        localStorage.removeItem("cart");
        alert("Order placed successfully!");
        navigate("/");
      })
      .catch(() => alert("Order failed"));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 max-w-7xl mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-7 space-y-10">

          <div>
            <h1 className="text-3xl font-semibold mb-2">Checkout</h1>
            <p className="text-gray-500">Review your details</p>
          </div>

          {/* SHIPPING (Simple Input) */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Shipping Address</h2>

            <input placeholder="Full Name" className="w-full border-b py-2 outline-none" />
            <input placeholder="Email" className="w-full border-b py-2 outline-none" />
            <input placeholder="Address" className="w-full border-b py-2 outline-none" />
            <input placeholder="City" className="w-full border-b py-2 outline-none" />
            <input placeholder="Zip Code" className="w-full border-b py-2 outline-none" />
          </div>

          {/* PAYMENT (UI only) */}
          <div>
            <h2 className="text-xl font-medium mb-4">Payment Method</h2>
            <div className="border p-4 rounded">
              Credit Card (Demo)
            </div>
          </div>

        </div>

        {/* RIGHT SIDE (SUMMARY) */}
        <div className="lg:col-span-5">

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* CART ITEMS */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-3">

                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-16 h-20 object-cover"
                  />

                  <div className="flex flex-col justify-between">
                    <div>
                      <h4>{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.size} | {item.color}
                      </p>
                    </div>
                    <p>${item.price}</p>
                  </div>

                </div>
              ))}
            </div>

            <hr className="my-4" />

            {/* TOTALS */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* PLACE ORDER */}
            <button
              onClick={placeOrder}
              className="w-full bg-black text-white py-3 mt-6 rounded"
            >
              Place Order
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;