import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { sessionStorageUtil } from "../utils/storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = sessionStorageUtil.getAccessToken();

    if (token && token !== "undefined") {

      const userData = sessionStorageUtil.getUserData();

      return userData ? userData : null;
    }

    return null;
  });

  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    sessionStorageUtil.clearUserData();
    sessionStorageUtil.clearAccessToken();
  };

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        setLoading(true);

        await new Promise((res) => {
          setTimeout(() => res(), 1500);
        });

        const token = sessionStorageUtil.getAccessToken();

        if (token && token !== "undefined") {

          const userData = sessionStorageUtil.getUserData();

          if (userData !== null) {
            // setUser(userData);
          } else {
            // setUser(null);
            sessionStorageUtil.clearUserData();
            sessionStorageUtil.clearAccessToken();
          }
        } else {
          // setUser(null);
          sessionStorageUtil.clearUserData();
          sessionStorageUtil.clearAccessToken();
        }
      } finally {
        setLoading(false);
      }
    };

    refreshAccessToken();
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
      login,
      logout,
    }),
    [user, login, logout, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth should be used with in AuthProvider");
  }

  return context;
};

export default AuthProvider;
