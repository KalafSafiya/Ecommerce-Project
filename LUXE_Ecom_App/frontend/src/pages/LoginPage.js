import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/AuthApi";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(form);
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login Successful!");

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/catalog");
      }
    } catch (error) {
      console.error("Login failed", error);
      if (error.response?.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert("Unable to login. Check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-gray-900">

      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      <div className="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-white text-center">LUXE</h1>
        <p className="text-gray-300 text-center mt-2">Welcome Back</p>

        <form onSubmit={handleLogin} className="space-y-5 mt-8">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white"
            >
              👁
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-white font-bold cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;