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


export const LoginForm: FC<TForm> = ({setHaveAccount, onClose}) => {

    const {login} = useLogin()
    const initialValues = {
        email: "",
        password: ""
    }
    const onSubmit = () => {
        login(values)
        resetForm()
        onClose?.()
        setHaveAccount(false)
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
            <Text cursor='pointer' color={'red.400'} fontWeight={'semibold'}>
                Forgot password?
            </Text>
        </HStack>
    </FormControl>;
}
