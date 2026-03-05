import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg select-none">
            U
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">
            UserHub
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 hidden sm:block">
            {user?.phone}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-indigo-600 border border-indigo-300 rounded-lg px-4 py-1.5 hover:bg-indigo-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
