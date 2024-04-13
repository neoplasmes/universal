import { useContext,createContext, useState, useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        userName: null,
        accessToken: null
    });
    
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    useEffect(() => {
        console.log(auth)
        console.log("persist is ", persist)
    }, [auth, persist])

    //автологин при первом открытии сайта
    const c = true;
    useLayoutEffect(() => {


        //копия из рефреш крюка
        const firstRefresh = async () => {
            const res = await axios.get("/refresh", {
                withCredentials: true,
            })
    
            setAuth(prev => {
                return {...prev, accessToken: res.data.accessToken}
            })
    
            return res.data.accessToken;
        }
        console.log(persist)

        //если в локал сторэдже сохранён постоянный логин persist, то даём пользователю аксестокен
        if(persist) {
            //firstRefresh();
        }
        
    }, [c])

    return (
        //теперь вем чилдрен доступны значения auth и функция setAuth
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    )
}

//Создаём крюк, что не писать каждый раз импорт useContext и AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}


//это говно использует крюк авторизации и применяет данные из него чтобы че то там понять нахуй. представляет из себя обычный лэйаут по сути, только не возвращающий нихуя
export const AuthorizedOnly = () => {
    const {auth} = useAuth();
    
    return (!auth?.accessToken ? <Navigate to = "/" /> : <Outlet/>);
}