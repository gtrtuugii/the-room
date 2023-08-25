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
import Profile from "./components/profile/profile";
import CheckEmail from "./components/chat/check_email";
import HomePage from "./components/homepage/HomePage.jsx";

//  Context files
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./components/context/context";

//  Main app
export default function App() {

  const { currentUser } = useContext(AuthContext);
  const [initialLoad, setInitialLoad] = useState(true);


  const ProctectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    else if(!currentUser.emailVerified){
      return <Navigate to="/check-mail"/>
    }
    return children
  }




  
  return (
    <div className="App">
      <HashRouter>
        <ToggleSideBar />
      
        <Routes>
          <Route exact path="/home" element={ <ProctectedRoute><Dashboard/></ProctectedRoute> } />
          <Route exact path="/app" element={ <ProctectedRoute><HomePage/></ProctectedRoute> } />
          <Route exact path="/login" element={<ChatLogin />} />
          <Route exact path="/register" element={<ChatRegister />} />
          <Route exact path="/chat" element={<ProctectedRoute><ChatHome/></ProctectedRoute>} />
          <Route exact path="/study" element={<ProctectedRoute><Study/></ProctectedRoute>} />
          <Route exact path="/intro" element={<Intro />} />
          <Route path='/check-email' element={<CheckEmail user={currentUser}/>} />
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/about" element={<About />} />
          {currentUser && (
            <Route
              exact
              path={`/profile/${currentUser.uid}`}
              element={<ProctectedRoute><Profile/></ProctectedRoute>}
            />
            )}
          
        </Routes>
      </HashRouter>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
