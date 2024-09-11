import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth"; // Adjust the path if necessary

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from useAuth to update state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple requests

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/loginUser`,
        { email, password }
      );

      if (res.status === 200) {
        Cookies.set("token", res.data.token); // Store token in cookies
        login(res.data.user, res.data.token); // Update auth state using login from useAuth
        toast.success("Logged In Successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

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
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
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
