import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Compiler from "./screens/Compiler";
import { Toaster } from "react-hot-toast";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Toaster />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/compiler" element={<Compiler />} />
                    <Route path="/compiler/:id" element={<Compiler />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
