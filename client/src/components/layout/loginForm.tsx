import {FC} from "react";
import {Button, FormControl, FormLabel, Heading, HStack, Input, Spacer, Text} from "@chakra-ui/react";
import {TForm} from "./registerForm";
import {useFormik} from "formik";
import {ErrorMassage} from "../customComps/errorMassage";
import {loginSchema} from "../../schemes/loginSchema";
import {useLogin} from "../../hooks/useLogin";
import {useSignIn} from "react-auth-kit";
import axios from "axios";
import {useGenerateToken} from "../../hooks/useGenerateToken";


export const LoginForm: FC<TForm> = ({setHaveAccount}) => {

    const {generateToken} = useGenerateToken()
    const {usersData} = useLogin()
    const initialValues = {
        email: "",
        password: ""
    }
    const onSubmit = () => {
        if (usersData?.length === 0) return alert('User not found')
        if (!usersData?.find(u => u.email === values.email && u.password === values.password)) {
            return alert('email or password is incorrect')
        }
        try {
            generateToken({email: values.email}).then(() => {
                resetForm()
            })
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

            <FormControl my={5}>
                <Button colorScheme='blue' w='100%' type='submit'>Sign-in</Button>
            </FormControl>
        </form>

        <HStack>
            <Text cursor='pointer' onClick={() => setHaveAccount(false)}>
                You don`t have an account yet?
            </Text>
            <Spacer/>
            <Text cursor='pointer'>
                Forgot your password?
            </Text>
        </HStack>
    </FormControl>;
}
