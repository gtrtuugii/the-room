//  imports
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";

//  Components

import Dashboard from "./components/dashboard/dashboard";
import ToggleSideBar from "./components/sidebar/sidebar";
import ChatLogin from "./components/chat/Login";
import ChatRegister from "./components/chat/Register.jsx"
import ChatHome from "./components/chat/ChatHome";
import Study from "./components/study/study";
import Intro from "./components/Intro/Intro";
import About from "./components/about/About.jsx";
import Welcome from "./components/welcome/Welcome.jsx";

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
      <HashRouter>
        <ToggleSideBar />
      
        <Routes>
          <Route exact path="/home" element={<ProctectedRoute><Dashboard/></ProctectedRoute>} />
          <Route exact path="/login" element={<ChatLogin />} />
          <Route exact path="/register" element={<ChatRegister />} />
          <Route exact path="/chat" element={<ProctectedRoute><ChatHome/></ProctectedRoute>} />
          <Route exact path="/study" element={<ProctectedRoute><Study/></ProctectedRoute>} />
          <Route exact path="/intro" element={<Intro />} />
          <Route exact path="/the-room" element={<Welcome />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
