import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleColorMode } from "@/store/slices/colorModeSlice";
import { RootState } from "@/store/store";

const Header = () => {
    const dispatch = useDispatch();
    const colorMode = useSelector(
        (state: RootState) => state.colorModeSlice.mode
    );

    const handleClick = () => {
        const newColorMode = colorMode === "light" ? "dark" : "light";
        dispatch(toggleColorMode(newColorMode));
    };

    return (
        <div className="bg-blue-300 py-2 px-10 flex justify-between border-b-2 items-center">
            <div>
                <img
                    src="https://res.cloudinary.com/dzqgyl0wf/image/upload/v1726008449/rbljfsr8o3ykqzi9f11y.png"
                    className="w-1/4 cursor-pointer"
                    alt="err"
                />
            </div>

            <div className="flex gap-4 items-center">
                <button
                onClick={handleClick}
                className={`
                    p-2 rounded-full
                    transition-colors duration-200 ease-in-out
                    focus:outline-none
                    ${colorMode === "light"
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none"
                        : "bg-gray-800 text-gray-100 hover:bg-gray-700 focus:outline-none"}
                `}
                aria-label={`Toggle ${colorMode === "light" ? "Dark" : "Light"} Mode`}
            >
                {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
                <Button className="bg-blue-700"> Sign Up </Button>
            </div>
        </div>
    );
};

export default Header;
