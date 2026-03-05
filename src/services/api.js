const BASE_URL = "https://dummyjson.com";

async function request(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Returns { users: [...] }
export const getUsers = () =>
  request("/users?limit=20").then((data) => data.users);

// Returns a single user object
export const getUserById = (id) => request(`/users/${id}`);

// Returns { posts: [...] }
export const getPostsByUser = (userId) =>
  request(`/posts/user/${userId}`).then((data) => data.posts);