import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

interface AuthProps {
    user: User | null;
    logout: () => void;
}

interface User {
    email: string;
    name: string;
    programs: string[];
    _id: string;
}

const Header = () => {
    const authContext = useContext(AuthContext);
    const { user, logout } = authContext as AuthProps;

    const handlePricing = () => {
        toast.success("Jk, its free");
    };

    return (
        <div className="bg-[#141414] py-4 px-10 flex justify-between items-center border-b-[1px] border-[#FEEDEC]/30">
            <Link to={"/"}>
                <div className="text-white text-sm font-thin">COMPILE-X</div>
            </Link>

            <div className="text-white text-sm flex gap-16">
                <Link target="_blank" to={"https://x.com/_keshav_malik"}>
                    Contact Us
                </Link>
                <Link
                    target="_blank"
                    to={"https://github.com/Keshav-0907/CompileX"}
                >
                    Github
                </Link>
                <Link to={"/"}>Services</Link>
                <div className="cursor-pointer" onClick={handlePricing}>
                    Pricing
                </div>
            </div>

            <div className="flex gap-4 items-center">
                {user ? (
                    <div className="flex gap-2">
                        <Link className="flex gap-2 text-white text-sm bg-[#3d3d3d] items-center shadow-md py-2 px-4 rounded-md cursor-pointer" to={"/dashboard"}> Dashboard </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="flex gap-2 text-white text-sm bg-[#3d3d3d] items-center shadow-md py-2 px-4 rounded-md cursor-pointer">
                                    <FaUser /> Hi, {user?.name}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={"/dashboard"}>Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout}>
                                    LogOut
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Link
                        to={"/signup"}
                        className="text-white text-sm border-[1px] border-[#4a4a4a] rounded-[12px]  px-4 py-2"
                    >
                        Sign Up Now
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
