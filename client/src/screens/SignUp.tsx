import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/user/createUser`,
            { name, email, password }
        );

        if (res.status === 200) {
            toast.success("User Registered");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return
        }

        toast.error("Somwthing went wrong");


    };
    return (
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <div className="text-2xl font-semibold text-blue-700 text-center mb-6">
                    Register at CompileX
                </div>
                <div className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email ID"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        type="password"
                    />
                    <Button
                        onClick={handleSignUp}
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Submit
                    </Button>
                </div>
                <div className="text-sm pt-2">
                    {" "}
                    Already Registered ??{" "}
                    <Link to={"/login"}> Login Here </Link>{" "}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
