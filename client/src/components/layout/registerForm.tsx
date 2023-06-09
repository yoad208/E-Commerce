import {Dispatch, FC} from "react";
import {
    FormControl,
    Input,
    Button,
    Heading, Box, FormLabel, Text, Stack, HStack
} from '@chakra-ui/react'
import {IUser} from "../../interfaces/IUser.interface";
import {useFormik} from 'formik'
import {v4 as uuidV4} from "uuid";
import {registerSchema} from "../../schemes/userScheme";
import {ErrorMassage} from "../customComps/errorMassage";
import {useLogin} from "../../hooks/useLogin";
import {GoogleAuth} from "./googleAuth";
import {shouldThrowError} from "@tanstack/react-query/build/lib/utils";


export type TForm = {
    setHaveAccount: Dispatch<boolean>
    onClose?: () => void
}
export const RegisterForm: FC<TForm> = ({setHaveAccount, onClose}) => {

    const {register} = useLogin()
    const initialValues: IUser = {
        id: uuidV4(),
        provider: "gmail",
        userName: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        address: []
    }
    const onSubmit = () => {
        register(values)
        resetForm()
        setHaveAccount(true)
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
        validationSchema: registerSchema,
        onSubmit
    })


    return <FormControl>
        <form onSubmit={handleSubmit}>
            <Heading fontSize={24} textAlign='center'>Create account right here</Heading>
            <FormControl>
                <FormLabel>userName:</FormLabel>
                <Input
                    w='full'
                    type='text'
                    placeholder='Enter full name'
                    {...getFieldProps('userName')}
                />
                {errors.userName && touched.userName && <ErrorMassage children={errors.userName}/>}
            </FormControl>

            <FormControl>
                <FormLabel>Phone:</FormLabel>
                <Input
                    w='full'
                    type='tel'
                    placeholder='Insert your phone number'
                    {...getFieldProps('phone')}
                />
                {errors.phone && touched.phone && <ErrorMassage children={errors.phone}/>}
            </FormControl>

            <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                    w='full'
                    type='email'
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
                    placeholder='Password (min 8 character)'
                    {...getFieldProps('password')}
                />
                {errors.password && touched.password && <ErrorMassage children={errors.password}/>}
            </FormControl>


            <FormControl my={3}>
                <Button colorScheme='blue' w='100%' type='submit'>Register</Button>
            </FormControl>
        </form>
        <Stack gap={2}>
            <FormControl>
                <GoogleAuth onClose={onClose}/>
            </FormControl>

            <FormControl>
                <Text cursor='pointer' onClick={() => setHaveAccount(true)}>
                    already have an account?
                </Text>
            </FormControl>
        </Stack>
    </FormControl>
}
