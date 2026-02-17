import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupAdmin } from "@/lib/bot";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signupAdmin(email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      {/* CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT ORANGE PANEL */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="mb-6 text-lg font-semibold">🚀 SCALUP</div>

          <h1 className="text-4xl font-bold leading-tight mb-4">
            Create <br /> SCALUP Admin
          </h1>

          <p className="opacity-90 max-w-sm">
            Register to access the admin dashboard and manage the platform
            securely.
          </p>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="flex items-center justify-center p-10 bg-slate-50">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Sign Up</h2>
              <p className="text-sm text-slate-500 mt-1">
                Create your admin account
              </p>
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

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold shadow-md"
            >
              Create Admin
            </button>

            {/* LOGIN LINK */}
            <p className="text-sm text-center text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
