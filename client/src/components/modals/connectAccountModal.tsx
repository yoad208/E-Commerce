import {FC, useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody, useDisclosure,
    ModalCloseButton,
    Text, ModalFooter
} from '@chakra-ui/react'
import {RegisterForm} from "./registerForm";
import {LoginForm} from "./loginForm";
import {Icon} from "@chakra-ui/icons";
import {AiOutlineClose} from "react-icons/all";

type Props = {
    btnText: string
}
export const ConnectAccountModal: FC<Props> = ({btnText}) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [haveAccount, setHaveAccount] = useState<boolean>(false)

    return <>
        <Text cursor='pointer' width={'100%'} onClick={onOpen}>{btnText}</Text>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent m={'auto'} p={0} maxW={'550px'}>
                <ModalHeader>
                    <ModalCloseButton onClick={onClose}
                                      borderWidth={1}
                                      borderColor={"red.700"}
                                      borderRadius='full'
                                      transition='.5s'
                                      _hover={{bg: '#C53030'}}>
                        <Icon as={AiOutlineClose} fontSize={20}/>
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    {haveAccount
                        ? <LoginForm setHaveAccount={setHaveAccount}/>
                        : <RegisterForm setHaveAccount={setHaveAccount}/>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}
