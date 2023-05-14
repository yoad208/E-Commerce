import {FC} from "react";
import {
    FormLabel,
    FormControl,
    Input,
    Button,
    Heading
} from '@chakra-ui/react'


export const RegisterForm: FC = () => {
    return <form>
        <Heading fontSize={24} textAlign='center' >Create account right here</Heading>
        <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input w='full' type='text' placeholder='Enter full name'/>
        </FormControl>
        <FormControl>
            <FormLabel>Phone:</FormLabel>
            <Input w='full' type='tel' placeholder='Insert your phone number'/>
        </FormControl>
        <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input w='full' type='email' placeholder='expemple@gmail.com'/>
        </FormControl>
        <FormControl>
            <FormLabel>Password:</FormLabel>
            <Input w='full' type='text' placeholder='Password (min 8 character)'/>
        </FormControl>

        <FormControl my={5}>
            <Button colorScheme='blue' w='100%' type='submit'>Sign-in</Button>
        </FormControl>
    </form>
}
