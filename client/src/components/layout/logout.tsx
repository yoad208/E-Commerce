import React, {FC} from 'react';
import {HStack, Spacer, Stack, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {FiLogOut} from "react-icons/all";

export const Logout:FC = () => {
    return (
        <HStack w={"full"} cursor='pointer'>
            <Text>Logout</Text>
            <Spacer/>
            <Icon as={FiLogOut}  color={'red'} />
        </HStack>
    );
}