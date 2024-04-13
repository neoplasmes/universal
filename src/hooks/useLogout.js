import { useAuth } from "../context/authContext";
import axios from "../api/axios";


const useLogout = () => {
    const {setAuth, setPersist} = useAuth();

    const logout = async () => {
        setAuth({userName: null, accessToken: null});
        setPersist(false);
        localStorage.setItem("persist", false)

        //Удаляем рефреш жвт токен из базы данных
        try {
            const res = await axios("/logout", {withCredentials: true})
        } catch(err) {
            console.log(err);
        }
    }

    return logout;
}

export default useLogout;