import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, RectangleEllipsis, Mail } from "lucide-react";

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
            return;
        }

        toast.error("Somwthing went wrong");
    };
    return (
        <div className="flex items-center justify-center bg-[#141414] h-[calc(100vh-71px)] shadow-md">
            <div className="bg-[#1c1c1c] p-8 rounded-lg shadow-xl shadow-[#000000]/40 w-1/3 border-[1px] border-[#FEEDEC]/30">
                <div className="text-2xl font-semibold text-white text-center mb-6">
                    Register at CompileX
                </div>
                <div className="space-y-4">
                    <div className="bg-[#1c1c1c] text-white border-[1px] border-[#FEEDEC] flex rounded-md gap-2 py-2 px-2">
                        <User size={20} strokeWidth={2} />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#1c1c1c] text-white outline-none text-sm"
                            placeholder="Name"
                        />
                    </div>

                    <div className="bg-[#1c1c1c] text-white border-[1px] border-[#FEEDEC] flex rounded-md gap-2 py-2 px-2">
                        <Mail size={20} strokeWidth={2} />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#1c1c1c] text-white outline-none text-sm"
                            placeholder="Email ID"
                        />
                    </div>

                    <div className="bg-[#1c1c1c] text-white border-[1px] border-[#FEEDEC] flex rounded-md gap-2 py-2 px-2">
                        <RectangleEllipsis size={20} strokeWidth={2} />
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1c1c1c] text-white outline-none text-sm"
                            placeholder="Password"
                        />
                    </div>

                   
                    <Button
                        onClick={handleSignUp}
                        className="w-full bg-white text-black hover:bg-white rounded-md py-2"                    >
                        Submit
                    </Button>
                </div>
                <div className="text-sm pt-2 text-white">
                    {" "}
                    Already Registered ??{" "}
                    <Link to={"/login"} className="text-blue-300"> Login Here </Link>{" "}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
