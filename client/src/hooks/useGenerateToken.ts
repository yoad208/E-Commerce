import axios from "axios";
import {useSignIn} from "react-auth-kit";

export const useGenerateToken = () => {

    const signIn = useSignIn()
    const generateToken = async (userInfo: {email: string}) => {
        const res = await axios.post('http://localhost:3000/login', {email: userInfo.email})
        signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: res.data.user
        })
    }

    return {generateToken}
}
