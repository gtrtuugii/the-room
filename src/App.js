//  imports
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//  Components

import Dashboard from "./components/dashboard/dashboard";
import ToggleSideBar from "./components/sidebar/sidebar";
import ChatLogin from "./components/chat/Login";
import ChatRegister from "./components/chat/Register.jsx"
import ChatHome from "./components/chat/ChatHome";
import Study from "./components/study/study";
import Home from "./components/Intro/Intro";

//  Context files
import { useContext } from "react";
import { AuthContext } from "./components/context/context";
//  Main app
export default function App() {

  const { currentUser } = useContext(AuthContext);
  const ProctectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }

  
  return (
    <div className="App">
      <BrowserRouter>
        <ToggleSideBar />
        <Routes>
          <Route exact path="/home" element={<ProctectedRoute><Dashboard/></ProctectedRoute>} />
          <Route exact path="/login" element={<ChatLogin />} />
          <Route exact path="/register" element={<ChatRegister />} />
          <Route exact path="/chat/home" element={<ProctectedRoute><ChatHome/></ProctectedRoute>} />
          <Route exact path="/study" element={<Study />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
