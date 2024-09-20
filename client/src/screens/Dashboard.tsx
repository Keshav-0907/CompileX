"use client";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import CodeCard from "@/components/common/CodeCard";
import { Plus } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Dashboard = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (!authContext.user) {
            navigate("/login");
        }
    }, [authContext.user, navigate]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/getAllProjects`, 
                    {
                        params: { userId: user?._id }, 
                    }
                );
                setProjects(res.data.programs); 
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        

        fetchProjects();
    }, [authContext.user?._id]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/deleteCode`,
                {
                    codeId: id,
                }
            );
            if (res.status === 200) {
                toast.success("Project deleted successfully");
                // Update the projects state to remove the deleted project
                setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };
    
    return (
        <div className="py-10 px-20 flex flex-col gap-5 bg-[#141414] min-h-[calc(100vh-61px)]">
            <div>
                <div className="text-white text-4xl">Dashboard</div>
                <div className="text-gray-400">Your all projects</div>
            </div>
            <div className="flex justify-end">
                <Link
                    to={"/compiler"}
                    className="text-white border-[1px] hover:bg-[#1e1e1e] flex gap-2 border-[#FEEDEC]/50 rounded-md cursor-pointer px-4 py-2"
                >
                    <Plus /> Create New Project
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {
                    projects.length === 0 && (
                        <div className="text-white text-2xl col-span-3 text-center">No projects found</div>
                    )
                }
                {
                    projects.map((project) => (
                        <CodeCard key={project._id} project={project} handleDelete={handleDelete}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Dashboard;
