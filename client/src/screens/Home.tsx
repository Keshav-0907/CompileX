"use client";
import { Rocket, SquareTerminal } from "lucide-react";
import CodeScreen from "../assets/CodeScreen.png";
import NoLogin from "../assets/NoLogin.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#141414] h-[calc(100vh-71px)] px-20 pt-20 flex flex-col gap-10 overflow-hidden">
            <div className="flex justify-center flex-col items-center gap-2">
                <div className="text-[#F5F5F5] text-7xl font-light w-4/5 text-center">
                    Code, Compile, Create – All in One Web-Based IDE
                </div>
                <div className="text-[#8e8e8e] text-center w-5/12">
                    CompileX is a powerful web-based compiler designed for
                    seamless development in HTML, CSS, and JavaScript.
                </div>
            </div>

            <div className="flex justify-center items-center gap-10 relative">
                <button onClick={()=>navigate('/login')} className="bg-[#161616] text-white border-[1px] border-[#FFFFFF]/20 px-20 flex gap-2 py-3 items-center rounded-md">
                    <Rocket size={16} strokeWidth={2} /> Get Started
                </button>
                <button onClick={()=>navigate('/compiler')} className="bg-[#ffffff] text-black border-[1px] border-[#FFFFFF]/20 px-20 flex gap-2 py-3 items-center rounded-md">
                    {" "}
                    <SquareTerminal size={16} strokeWidth={2} /> Go to Compiler{" "}
                </button>
                <div className="absolute right-40 bottom-5 ">
                    <img className="w-40 animate-bounce" src={NoLogin} alt="err" />
                </div>
            </div>

            <div className="py-10">
                <img src={CodeScreen} alt="err" />
            </div>
        </div>
    );
};

export default Home;
