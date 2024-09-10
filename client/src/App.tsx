import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Compiler from "./screens/Compiler";

function App() {
    return (
       <>
        <Header/>
         <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/compiler" element={<Compiler />} />
            </Routes>
        </BrowserRouter>
       </>
    );
}

export default App;
