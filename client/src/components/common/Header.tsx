import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleColorMode } from "@/store/slices/colorModeSlice";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

const Header = () => {

    const authContext = useContext(AuthContext); 

    const { user, logout } = authContext;

    const dispatch = useDispatch();
    const colorMode = useSelector(
        (state: RootState) => state.colorModeSlice.mode
    );


    const handleClick = () => {
        const newColorMode = colorMode === "light" ? "dark" : "light";
        dispatch(toggleColorMode(newColorMode));
    };

    // const handleLogout = () => {
    //     toast.success("Logged Out Successfully");
    //     setTimeout(() => {
    //         logout();
    //     }, 1000);
    // };

    return (
        <div className="bg-blue-300 py-2 px-10 flex justify-between border-b-2 items-center">
            <Link to={"/"}>
                <img
                    src="https://res.cloudinary.com/dzqgyl0wf/image/upload/v1726008449/rbljfsr8o3ykqzi9f11y.png"
                    className="w-1/4 cursor-pointer"
                    alt="err"
                />
            </Link>

            <div className="flex gap-4 items-center">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex gap-2 items-center bg-blue-200 shadow-md p-1 rounded-xl cursor-pointer">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>
                                        {user?.name}
                                    </AvatarFallback>
                                </Avatar>
                                Hi, {user?.name}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={"/dashboard"}>Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={"/"}>Github</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                                LogOut
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link
                        to={"/signup"}
                        className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
                    >
                        Signup Now
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
