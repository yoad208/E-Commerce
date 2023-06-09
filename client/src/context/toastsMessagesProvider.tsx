import {useToast} from "@chakra-ui/react";
import {createContext, FC} from "react";

export const toastsMessages = createContext({} as any)

export const ToastsMessagesProvider: FC<any> = ({children}) => {

    const toast = useToast()

    const ErrorToast = (message : string) => {
        return toast({
            title: 'Error.',
            description: message,
            status: 'error',
            duration: 9000,
            position: 'bottom-left',
            isClosable: true,
        })
    }

    const SuccessToast = (message : string) => {
        return toast({
            title: 'Success.',
            description: message,
            status: 'success',
            duration: 9000,
            position: 'bottom-left',
            isClosable: true,
        })
    }

    return <toastsMessages.Provider value={{
        ErrorToast,
        SuccessToast
    }}>
        {children}
        </toastsMessages.Provider>
}
