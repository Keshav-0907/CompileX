import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { RectangleEllipsis, Mail } from "lucide-react";

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

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [navigate, user]);

    return (
        <div className="flex items-center justify-center bg-[#141414] h-[calc(100vh-71px)] shadow-md">
            <div className="bg-[#1c1c1c] p-8 rounded-lg shadow-xl shadow-[#000000]/40 w-1/3 border-[1px] border-[#FEEDEC]/30">
                <div className="text-2xl font-semibold text-white text-center mb-6">
                    Login to CompileX
                </div>
                <div className="space-y-4">
                    <div className="bg-[#1c1c1c] text-white border-[1px] border-[#FEEDEC] flex rounded-md gap-2 py-2 px-2">
                        <Mail size={20} strokeWidth={2} />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#1c1c1c] text-white outline-none text-sm"
                            placeholder="Email"
                        />
                    </div>

                    <div className="bg-[#1c1c1c] text-white border-[1px] border-[#FEEDEC] flex rounded-md gap-2 py-2 px-2">
                        <RectangleEllipsis size={20} strokeWidth={2} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1c1c1c] text-white outline-none text-sm"
                            placeholder="Password"
                        />
                    </div>

                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-white text-black hover:bg-white rounded-md py-2"
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </Button>
                </div>
                <div className="text-sm pt-2 text-white">
                    Not Registered? <Link to="/signup" className="text-blue-300">Sign Up Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
