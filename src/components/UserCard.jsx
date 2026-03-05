import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const fullName = `${user.firstName} ${user.lastName}`;
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => navigate(`/users/${user.id}`)}
      className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/users/${user.id}`)}
      aria-label={`View profile for ${fullName}`}
    >
      <div className="flex items-center gap-4 mb-4">
        {/* Profile picture with fallback to initials */}
        {user.image && !imgError ? (
          <img
            src={user.image}
            alt={fullName}
            onError={() => setImgError(true)}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <FallbackAvatar name={fullName} />
        )}
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 truncate">{fullName}</p>
          <p className="text-sm text-slate-400 truncate">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-1.5 text-sm text-slate-500">
        <p className="truncate">
          <span className="mr-1.5">✉</span>
          {user.email}
        </p>
        <p className="truncate">
          <span className="mr-1.5">🏢</span>
          {user.company?.name ?? "N/A"}
        </p>
        <p className="truncate">
          <span className="mr-1.5">📞</span>
          {user.phone}
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <span className="text-xs text-indigo-600 font-semibold">
          View profile →
        </span>
      </div>
    </article>
  );
}

function FallbackAvatar({ name }) {
  const COLORS = [
    "bg-indigo-100 text-indigo-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
  ];
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const colorClass = COLORS[name.charCodeAt(0) % COLORS.length];
  return (
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${colorClass}`}
    >
      {initials}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    image: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

FallbackAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};