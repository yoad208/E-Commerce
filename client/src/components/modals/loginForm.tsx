import {FC} from "react";
import {Button, FormControl, FormLabel, Heading, Input} from "@chakra-ui/react";


export const LoginForm: FC = () => {
    return <form>
        <Heading fontSize={24} textAlign='center'>Sign-in to your account</Heading>
        <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input w='full' type='text' placeholder='expemple@gmail.com'/>
        </FormControl>
        <FormControl>
            <FormLabel>Password:</FormLabel>
            <Input w='full' type='text' placeholder='Password'/>
        </FormControl>

        <FormControl my={5}>
            <Button colorScheme='blue' w='100%' type='submit'>Sign-in</Button>
        </FormControl>
    </form>
}