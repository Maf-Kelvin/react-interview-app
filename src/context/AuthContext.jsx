import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isSessionExpired, SESSION_TIMEOUT_MS } from "../utils/validators";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (isSessionExpired(parsed.loginTime)) {
        localStorage.removeItem("auth_user");
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  useEffect(() => {
    if (!user) return;
    const elapsed = Date.now() - new Date(user.loginTime).getTime();
    const remaining = SESSION_TIMEOUT_MS - elapsed;
    if (remaining <= 0) {
      logout();
      return;
    }
    const timer = setTimeout(() => {
      logout();
    }, remaining);
    return () => clearTimeout(timer);
  }, [user]);

  const login = (phone) => {
    const userData = { phone, loginTime: new Date().toISOString() };
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}