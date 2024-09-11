import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center flex-col font-semibold gap-10">
            <div className="text-center">
                <div className="text-5xl text-blue-300">Coloborate.</div>
                <div className="text-7xl text-blue-500">Compile.</div>
                <div className="text-9xl text-blue-700">Create.</div>
            </div>

            <div className="flex gap-10">
                <Button className="bg-blue-500">
                    <Link to={"/compiler"}>Get Started</Link>
                </Button>
                <Button variant="outline"> Know More </Button>
            </div>
        </div>
    );
};

export default Home;
