import { useAuth } from "../context/authContext";
import axios from "../api/axios";


const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const res = await axios.get("/refresh", {
            withCredentials: true,
        })

        setAuth(prev => {
            return {...prev, accessToken: res.data.accessToken}
        })

        return res.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;