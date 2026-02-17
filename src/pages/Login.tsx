import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await login(email, password);
    if (!ok) return setError("Invalid credentials");

    navigate("/blogs");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      {/* CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT ORANGE PANEL */}
        {/* LEFT ORANGE PANEL */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          {/* LOGO */}
          <div className="mb-8">
            <img
              src="/log.png"
              alt="SCALUP Logo"
              className="h-16 w-auto drop-shadow-lg"
            />
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-4">
            Welcome to <br /> SCALUP Admin
          </h1>

          <p className="opacity-90 max-w-sm">Manage your blogs</p>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="flex items-center justify-center p-10 bg-slate-50">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Sign In</h2>
              <p className="text-sm text-slate-500 mt-1">Welcome back 👋</p>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* FORGOT PASSWORD */}
            <div className="text-right text-sm">
              <span className="text-slate-500 cursor-pointer hover:text-orange-500">
                Forgot password?
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold shadow-md"
            >
              Sign In
            </button>

            {/* SIGNUP */}
            <p className="text-sm text-center text-slate-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-500 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
