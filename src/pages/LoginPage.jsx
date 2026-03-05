import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validatePhone, mockAuthenticate } from "../utils/validators";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const validationError = touched ? validatePhone(phone) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setServerError("");
    const fieldErr = validatePhone(phone);
    if (fieldErr) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (mockAuthenticate(phone.trim())) {
      login(phone.trim());
      navigate("/");
    } else {
      setServerError(
        "This number is not registered. Use the demo credentials below."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-10">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            U
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-none">
              UserHub
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">Sign in to continue</p>
          </div>
        </div>

        {/* Server error */}
        {serverError && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5"
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="+353812345678"
              aria-describedby={validationError ? "phone-error" : undefined}
              aria-invalid={!!validationError}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-300 ${
                validationError
                  ? "border-red-400 focus:border-red-400"
                  : "border-slate-300 focus:border-indigo-400"
              }`}
            />
            {validationError && (
              <p
                id="phone-error"
                role="alert"
                className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
              >
                <span>⚠</span> {validationError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-6 bg-slate-50 rounded-xl p-4 text-sm text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">Demo credentials</p>
          <p>
            Phone:{" "}
            <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 text-xs">
              +353812345678
            </code>
          </p>
          <p className="text-xs mt-1 text-slate-400">Ireland (+353)</p>
        </div>
      </div>
    </div>
  );
}