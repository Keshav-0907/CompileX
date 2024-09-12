"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User, JWTTokenPayload } from "@/types/index";
import { StringExpression } from "mongoose";
import toast from "react-hot-toast";

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    orgAdminLogin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
        const token = localStorage.getItem("token");
        console.log("Token Chekc:", token);
        if (token) {
            try {
                const decoded = jwtDecode(token);
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

    console.log('User', user)

    const login = async (email: string, password: StringExpression) => {
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
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded);
                setUser({
                    email: decoded.email,
                    name: decoded.name,
                    programs: decoded.programs,
                    _id: decoded._id,
                });
                console.log("Login successful", decoded);
            }
            toast.success("Hey! You are logged in successfully");
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.error("Login failed", error);
            toast.error("Login failed");
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
