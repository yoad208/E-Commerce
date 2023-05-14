import React from 'react';
import {Button, Image, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const EmptyWishListMessage = () => {

    const navigate = useNavigate()

    return <VStack alignContent={"center"} gap={5} p={5}>
        <Image src={'https://sheinsz.ltwebstatic.com/she_dist/images/shoppingcart-empty-50eb82fb72.png'}/>
        <Text
            fontSize={14}
            textAlign={'center'}
            color={'blackAlpha.600'}
        >
            It is empty here. <br/>
            Personalize your shopping experience with your Wishlist.
        </Text>
        <Text fontSize={20} fontWeight={'bold'}>
            Already have items saved?
        </Text>
        <Button
            width={'full'}
            maxW={250}
            bg={"blackAlpha.900"}
            color={"whitesmoke"}
            onClick={() => navigate('/Store')}
        >SHOP NOW!</Button>
    </VStack>
}
