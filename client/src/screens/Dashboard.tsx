import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import CodeCard from "@/components/common/CodeCard";
import { Card, CardContent } from "@/components/ui/card";
import { FileJson, FileCode, Plus } from "lucide-react";

const files = [
    { name: "index.html", icon: FileJson, color: "text-orange-500" },
    { name: "styles.css", icon: FileCode, color: "text-blue-500" },
    { name: "script.js", icon: FileJson, color: "text-yellow-500" },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (!authContext.user) {
            navigate("/login");
        }
    }, [authContext.user, navigate]);

    return (
        <div className="p-20 flex flex-col gap-5">
            <Card className="w-64 h-full bg-blue-50 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <Link to="/compiler">
                    <CardContent className="p-4 flex justify-center">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">
                            Lets make a new product
                        </h3>
                        <ul className="space-y-3">
                            <Plus className={`w-5 h-5 text-green-500`} />
                        </ul>
                    </CardContent>
                </Link>
            </Card>
            <div className="flex grid-cols-2 gap-5">
                <CodeCard />
                <CodeCard />
                <CodeCard />
                <CodeCard />
                <CodeCard />
                <CodeCard />
            </div>
        </div>
    );
};

export default Dashboard;
