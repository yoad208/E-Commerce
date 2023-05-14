import React, {FC} from "react";
import {Button, Image, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const EmptyCartMessage: FC = () => {

    const navigate = useNavigate()

    return <VStack alignContent={"center"} p={5} gap={5}>
        <Image src={'https://sheinsz.ltwebstatic.com/she_dist/images/shoppingcart-empty-50eb82fb72.png'}/>
        <Text
            fontWeight={'extrabold'}
            fontSize={22}
        >YOUR BAG IS EMPTY!</Text>
        <Button
            width={'full'}
            maxW={250}
            bg={"blackAlpha.900"}
            color={"whitesmoke"}
            onClick={() => navigate('/Store')}
        >SHOP NOW!</Button>
    </VStack>
}
