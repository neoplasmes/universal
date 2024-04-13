import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuth } from "../../context/authContext";



const PersistLogin = () => {
    const [loading, setLoading] = useState();
    const refresh = useRefreshToken();
    const {auth} = useAuth();


}