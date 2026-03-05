import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-indigo-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}