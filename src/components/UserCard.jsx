import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <article
      onClick={() => navigate(`/users/${user.id}`)}
      className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/users/${user.id}`)}
      aria-label={`View profile for ${fullName}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <Avatar name={fullName} size="md" />
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 truncate">{fullName}</p>
          <p className="text-sm text-slate-400 truncate">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-1.5 text-sm text-slate-500">
        <p className="truncate"><span className="mr-1.5">✉</span>{user.email}</p>
        <p className="truncate"><span className="mr-1.5">🏢</span>{user.company?.name ?? "N/A"}</p>
        <p className="truncate"><span className="mr-1.5">📞</span>{user.phone}</p>
      </div>

      <div className="mt-4 flex justify-end">
        <span className="text-xs text-indigo-600 font-semibold">View profile →</span>
      </div>
    </article>
  );
}