import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface ProjectProps {
    _id: string;
    name: string;
    updatedAt: string;
}

interface CodeCardProps {
    project: ProjectProps;
    handleDelete: (id: string) => void;
}

const formatDate = (
    timestamp: string | number | Date | null | undefined
): string => {
    if (timestamp === null || timestamp === undefined) return "N/A";

    const date = new Date(timestamp);
    return isNaN(date.getTime())
        ? "Invalid date"
        : date.toISOString().split("T")[0];
};

const CodeCard = ({ project, handleDelete }: CodeCardProps) => {
    const navigate = useNavigate();

    return (
        <Card className="w-[350px] border-[1px] border-gray-600 transition-shadow duration-300 bg-[#141414]">
            <CardHeader className="space-y-1 text-white">
                <CardTitle className="text-2xl font-bold">
                    {project.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                    Last modified: {formatDate(project?.updatedAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-white">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <FaHtml5 className="text-orange-500" size={20} /> HTML
                    </Label>
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <FaCss3Alt className="text-blue-500" size={20} /> CSS
                    </Label>
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <TbBrandJavascript
                            className="text-yellow-400"
                            size={20}
                        />{" "}
                        JavaScript
                    </Label>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-10">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleDelete(project._id)}
                >
                    Delete
                </Button>
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate(`/compiler/${project._id}`)}
                >
                    Visit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CodeCard;
