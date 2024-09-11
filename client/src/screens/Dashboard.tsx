import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    console.log("From DB", isAuthenticated);
    return <div>
        <h1>Dashboard</h1>
        <h2>{user?.email}</h2>
        <button onClick={logout}>Logout</button>
    </div>;
};

export default Dashboard;
