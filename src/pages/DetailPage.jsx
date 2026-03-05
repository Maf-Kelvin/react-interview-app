import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { getUserById, getPostsByUser } from "../services/api";

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <span className="text-lg w-6 text-center flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-slate-700 mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

InfoRow.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  const [postsError, setPostsError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setUserLoading(true);
    setPostsLoading(true);
    setUserError(null);
    setPostsError(null);
    setImgError(false);

    getUserById(id)
      .then(setUser)
      .catch((err) => setUserError(err.message))
      .finally(() => setUserLoading(false));

    getPostsByUser(id)
      .then(setPosts)
      .catch((err) => setPostsError(err.message))
      .finally(() => setPostsLoading(false));
  }, [id]);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors mb-8"
        >
          ← Back to Users
        </button>

        {userLoading && <Spinner fullPage />}
        {userError && (
          <ErrorMessage
            message={userError}
            onRetry={() => window.location.reload()}
          />
        )}

        {!userLoading && !userError && user && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Profile */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  {user.image && !imgError ? (
                    <img
                      src={user.image}
                      alt={fullName}
                      onError={() => setImgError(true)}
                      className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold border-4 border-indigo-50">
                      {fullName
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                  <h2 className="font-bold text-slate-800 text-xl mt-4">
                    {fullName}
                  </h2>
                  <p className="text-slate-400 text-sm">@{user.username}</p>
                  <span className="mt-3 inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {user.company?.name ?? "N/A"}
                  </span>
                </div>

                <InfoRow icon="✉" label="Email" value={user.email} />
                <InfoRow icon="📞" label="Phone" value={user.phone} />
                <InfoRow icon="🌐" label="Website" value={user.domain ?? "N/A"} />
                <InfoRow
                  icon="📍"
                  label="Address"
                  value={
                    user.address
                      ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}`
                      : "N/A"
                  }
                />
                <InfoRow icon="🏢" label="Company" value={user.company?.name ?? "N/A"} />
                <InfoRow icon="🎂" label="Age" value={`${user.age} years old`} />
                <InfoRow icon="🧑‍💼" label="Role" value={user.role ?? "N/A"} />
              </div>
            </div>

            {/* Right: Posts */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-slate-800 text-lg">Posts</h3>
                {!postsLoading && !postsError && (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
                    {posts.length}
                  </span>
                )}
              </div>

              {postsLoading && <Spinner />}
              {postsError && <ErrorMessage message={postsError} />}

              {!postsLoading && !postsError && posts.length === 0 && (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-3xl mb-2">📭</p>
                  <p className="font-semibold text-slate-600">No posts yet</p>
                  <p className="text-sm mt-1">
                    This user hasn&apos;t posted anything.
                  </p>
                </div>
              )}

              {!postsLoading && !postsError && posts.length > 0 && (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                    >
                      <h4 className="font-semibold text-slate-800 mb-2 text-sm leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {post.body}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-indigo-50 text-indigo-500 px-2.5 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}