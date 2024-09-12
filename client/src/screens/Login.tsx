import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "@/context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, user } = authContext;
    const loading = false;

    const handleLogin = async () => {
        await login(email, password);
    };

    console.log('user', user)

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    },[navigate, user])

    return (
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <div className="text-2xl font-semibold text-blue-700 text-center mb-6">
                    Login to CompileX
                </div>
                <div className="space-y-4">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email ID"
                        type="email"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        type="password"
                    />
                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        className={`w-full py-2 rounded-md transition-colors duration-200 ${
                            loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </Button>
                </div>
                <div className="text-sm pt-2">
                    Not Registered? <Link to="/signup">Sign Up Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
