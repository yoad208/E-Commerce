import React from 'react';
import {Button} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {FcGoogle} from "react-icons/all";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useLogin} from "../../hooks/useLogin";
import {v4 as uuidV4} from "uuid";
import {IUser} from "../../interfaces/IUser.interface";
import {useGenerateToken} from "../../hooks/useGenerateToken";

export const GoogleAuth = () => {

    const {addUser, usersData} = useLogin()

    const {generateToken} = useGenerateToken()
    const initialValues: IUser = {
        id: uuidV4(),
        provider: "google",
        userName: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        address: []
    }
    const onSuccess = async (accessToken: any) => {
        const res = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken.access_token}`
                }
            })
        console.log(res.data)
        initialValues.email = res.data.email
        initialValues.userName = res.data.name
        addUser(initialValues)
    }

    const onError = (error: any) => {
        console.log(error.message);
    }


    const login = useGoogleLogin({onSuccess, onError})

    return <Button
        size={'sm'}
        colorScheme={'blue'}
        variant={'outline'}
        onClick={() => login()}
        leftIcon={<Icon as={FcGoogle} fontSize={26}/>}
    >
        Continue with google
    </Button>
}
