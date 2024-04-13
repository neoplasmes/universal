import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Todos from "./pages/todos";
import "./index.css"
import { AuthProvider, AuthorizedOnly } from "./context/authContext";


const Main = () => {
    return(
    <BrowserRouter>
        {/*Всему приложению теперь доступны данные авторизованного пользователя и метод их определения*/}
        <AuthProvider >
            <Routes>
                {/*Домашняя страница*/}
                <Route path="/" element={<Layout/>}>
                    <Route index element={
                    <p className="text-7xl">
                        fkgkmsd;fgmd;fmadfb;adfb;ladfba
                        fdhdfhafdh
                        adfh
                        adfbadf
                        an
                        adfnadfnadfnadfnadfnadfb
                        defaultadfv
                        adfbadnf
                        adfnadfnadfnadfnadfnadfbadfbadfvb

                        badf
                        na
                        dfn
                        adfnadfnadfnadfnadfnadfb

                        adfnadfnadfnadfnadfnadfbdfan
                        adfnadfnadfnadfnadfnadfbfdn
                        adfnadfnadfnadfnadfnadfbdfnafdn
                        adfnadfnadfnadfnadfnadfbfdnafdnafdn
                        adfnadfnadfnadfnadfnadfb
                    </p>
                }/>

                    {/*Только для авторизованных пользователей*/}
                    <Route element={<AuthorizedOnly />}> 
                        {/*тудушки*/}
                        <Route path="todos" element={<Todos/>} />
                    </Route>

                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
    );
}



ReactDOM.createRoot(document.getElementById("root")).render(<Main/>);
