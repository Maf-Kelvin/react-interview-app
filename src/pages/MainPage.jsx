import { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import SkeletonCard from "../components/SkeletonCard";
import ErrorMessage from "../components/ErrorMessage";
import { getUsers } from "../services/api";

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const loadUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filtered = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    if (!term) return users;
    return users.filter((u) => {
      const fullName = `${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase();
      return (
        fullName.includes(term) ||
        (u.email ?? "").toLowerCase().includes(term) ||
        (u.username ?? "").toLowerCase().includes(term) ||
        (u.company?.name ?? "").toLowerCase().includes(term)
      );
    });
  }, [users, debouncedSearch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Users</h2>
          {/* aria-live announces result count changes to screen readers */}
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-slate-400 mt-1 min-h-[20px]"
          >
            {!loading && !error
              ? `Showing ${filtered.length} of ${users.length} users`
              : ""}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-lg">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            🔍
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, username or company…"
            aria-label="Search users"
            className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors bg-white"
          />
        </div>

        {/* Skeleton loaders */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {error && <ErrorMessage message={error} onRetry={loadUsers} />}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-slate-600">No users found</p>
            <p className="text-sm mt-1">Try a different search term.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}