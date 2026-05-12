import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Handle basic string
        setUser({ name: storedUser });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white">
      {/* Background Blurs */}
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-20 top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 bottom-0 right-0"></div>

      {/* Header Navigation */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-white/10">
        <h1 
          className="text-2xl font-serif italic tracking-widest cursor-pointer"
          onClick={() => navigate("/catalog")}
        >
          LUXE
        </h1>
        <div className="flex gap-6 items-center">
          <span onClick={() => navigate("/catalog")} className="cursor-pointer hover:text-gray-300 transition">Shop</span>
          <span onClick={() => navigate("/cart")} className="cursor-pointer hover:text-gray-300 transition">Cart</span>
          <span onClick={handleLogout} className="cursor-pointer text-red-400 hover:text-red-300 transition font-medium">Logout</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-10 mb-10">
          <div className="flex items-center gap-6 border-b border-white/10 pb-8 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-1">{user?.name || "Premium Member"}</h2>
              <p className="text-gray-400">{user?.email || "member@luxe.com"}</p>
            </div>
          </div>

          <h3 className="text-xl font-medium mb-6">Recent Orders</h3>
          
          <div className="space-y-4">
            {/* Mock Order 1 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex justify-between items-center hover:bg-white/10 transition cursor-pointer">
              <div>
                <p className="text-sm text-gray-400 mb-1">Order #LX-8492</p>
                <h4 className="font-medium">Solstice Cashmere Coat</h4>
              </div>
              <div className="text-right">
                <p className="font-semibold">$850.00</p>
                <p className="text-sm text-green-400">Delivered</p>
              </div>
            </div>

            {/* Mock Order 2 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex justify-between items-center hover:bg-white/10 transition cursor-pointer">
              <div>
                <p className="text-sm text-gray-400 mb-1">Order #LX-8410</p>
                <h4 className="font-medium">Crescent Silk Blouse</h4>
              </div>
              <div className="text-right">
                <p className="font-semibold">$240.00</p>
                <p className="text-sm text-green-400">Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
