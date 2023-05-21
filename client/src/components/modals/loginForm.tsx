import {FC} from "react";
import {Button, FormControl, FormLabel, Heading, Input, Text} from "@chakra-ui/react";
import {TForm} from "./registerForm";
import {useFormik} from "formik";
import {ErrorMassage} from "../customComps/errorMassage";
import {loginSchema} from "../../schemes/loginSchema";
import {useLogin} from "../../hooks/useLogin";
import {useAuthUser, useSignIn} from "react-auth-kit";
import axios from "axios";


export const LoginForm: FC<TForm> = ({setHaveAccount}) => {

    const signIn = useSignIn()
    const auth = useAuthUser()
    const {usersData} = useLogin()
    const initialValues = {
        email: "",
        password: ""
    }
    const onSubmit = async () => {
        if (usersData?.length === 0) return alert('User not found')
        if (!usersData?.find(u => u.email === values.email && u.password === values.password)) {
            return alert('email or password is incorrect')
        }
        try {
            const res = await axios.post('http://localhost:3000/login', {email: values.email})
            signIn({
                token: res.data.token,
                expiresIn: res.data.expiresIn,
                tokenType: "Bearer",
                authState: {id: res.data.userId, email: values.email}
            })
            resetForm()
        } catch (e) {
            console.log(e)
        }
    }

    const {
        handleSubmit,
        getFieldProps,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit
    })

    return <FormControl>
        <form onSubmit={handleSubmit}>
            <Heading fontSize={24} textAlign='center'>Sign-in to your account</Heading>
            <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                    w='full'
                    type='text'
                    placeholder='expemple@gmail.com'
                    {...getFieldProps('email')}
                />
                {errors.email && touched.email && <ErrorMassage children={errors.email}/>}
            </FormControl>
            <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                    w='full'
                    type='text'
                    placeholder='Password'
                    {...getFieldProps('password')}
                />
                {errors.password && touched.password && <ErrorMassage children={errors.password}/>}
            </FormControl>

            <FormControl>
                <Text cursor='pointer' onClick={() => setHaveAccount(false)}>
                    You don`t have an account yet?
                </Text>
            </FormControl>

            <FormControl my={5}>
                <Button colorScheme='blue' w='100%' type='submit'>Sign-in</Button>
            </FormControl>
        </form>
    </FormControl>;
}
