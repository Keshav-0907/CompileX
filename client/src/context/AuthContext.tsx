"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  orgAdminLogin?: (email: string, password: string) => Promise<void>; // Optional as it's not used in the provider
}
interface JWTTokenPayload {
    email: string;
    name: string;
    programs: string[]; // Adjust the type based on your data (e.g., an array of strings or other)
    _id: string;
  }
  
  // Define the User interface
  interface User {
    email: string;
    name: string;
    programs: string[]; // Ensure this matches the programs type in JWTTokenPayload
    _id: string;
  }

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  
useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log("Token Check:", token);
    if (token) {
      try {
        const decoded: JWTTokenPayload = jwtDecode<JWTTokenPayload>(token); 
        console.log("Decoded token:", decoded);
        setUser({
          email: decoded.email,
          name: decoded.name,
          programs: decoded.programs,
          _id: decoded._id,
        });
      } catch (e) {
        console.error("Failed to decode token", e);
      }
    }
    setLoading(false);
  }, []);

  console.log("User", user);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/loginUser`, {
        email,
        password,
      });
      console.log("Response:", response);
      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token:", token);
        localStorage.setItem("token", token);
        const decoded = jwtDecode<JWTTokenPayload>(token);
        console.log("Decoded token:", decoded);
        setUser({
          email: decoded.email,
          name: decoded.name,
          programs: decoded.programs,
          _id: decoded._id,
        });
        console.log("Login successful", decoded);
        toast.success("Hey! You are logged in successfully");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
    toast.success("Logged out successfully");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
