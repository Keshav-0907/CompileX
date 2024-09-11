import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  console.log('first',isAuthenticated)

  // Define a function to check authentication status
  const checkAuth = useCallback(async () => {
    const token = Cookies.get("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/verifyToken`,
        { token }
      );
      if (res.status === 200) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuth(); // Check auth on mount
  }, [checkAuth]);

  const login = (user, token) => {
    Cookies.set("token", token); 
    setUser(user);
    setIsAuthenticated(true);
    window.location.reload(); // Reload the page to update the state
  };

  // Logout function to clear the state
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout, checkAuth };
};

export default useAuth;
