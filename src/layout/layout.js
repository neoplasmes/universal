import { Link, Outlet } from "react-router-dom";

import React, { useState } from 'react'
import RegistrationWindow from "../components/auth/reg_dialog";
import LoginWindow from "../components/auth/login_dialog";
import { useAuth } from "../context/authContext";
import useLogout from "../hooks/useLogout";


const NavBar = () => {
    const [isRegOpen, setRegOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const logout = useLogout();
    const {auth} = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    const openReg = () => {setRegOpen(true);}
    const closeReg = () => {setRegOpen(false);}

    const openLogin = () => {setLoginOpen(true);}
    const closeLogin = () => {setLoginOpen(false);}

    return (
        <>
        
            <nav className="bg-[#91afc473] w-11/12 fixed p-3 my-4 mx-auto left-0 right-0 flex flex-row rounded-[2rem] backdrop-blur-[8px] items-center">
                <Link to="/"><h1 className="text-red-200"> logo </h1></Link>
                <Link to="/todos">todos</Link>
                {auth?.accessToken
                ? 
                <div className="ml-auto flex flex-row items-center">
                    <h1>{"welcome"}</h1>
                    <button className="bg-slate-500 mx-2 p-2 rounded-2xl" onClick={handleLogout}>log out</button>
                </div>
                :
                <div className="ml-auto flex flex-row items-center">
                    <button className="bg-slate-500 mx-2 p-2 rounded-2xl" onClick={openLogin}>log in</button>
                    <button className="bg-slate-500 mx-2 p-2 rounded-2xl" onClick={openReg}>register</button>
                </div>}
                
            </nav>
            <RegistrationWindow isOpen={isRegOpen} onClose={closeReg}/>
            <LoginWindow isOpen={isLoginOpen} onClose={closeLogin}/>
        </>
    
    );
}

const Footer = () => {
    return(
        <footer className="bg-slate-900 text-white">
            poshli vi naxui
        </footer>
    );
}





const Layout = () => {
  return (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout;