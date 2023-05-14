import React, {FC, useEffect, useMemo, useState} from 'react';
import {Table, Text, TableContainer, Tbody, Thead, Heading, Box, Stack, Checkbox} from "@chakra-ui/react";
import {ICartItems} from "../../../interfaces/ICartItems.interface";
import {CartItemCard} from "./cartItemCard";
import {EmptyCartMessage} from "./emptyCartMessage";
import {CartItemsHeader} from "./cartItemsHeader";
import {useShoppingCart} from "../../../hooks/useShoppingCart";

export const CartItems: FC<ICartItems> = ({shoppingCartData, ...rest}) => {

    return <Box {...rest}>
        {(shoppingCartData || []).length > 0 && <CartItemsHeader shoppingCartData={shoppingCartData}/>}
        <Stack bg={"white"} rounded={'md'} py={2}>
            {(shoppingCartData || []).length > 0
                ? shoppingCartData?.map(item => {
                    return <CartItemCard
                        key={item.id}
                        id={item.id}
                        productID={item.productID}
                        color={item.color}
                        size={item.size}
                        quantity={item.quantity}
                        isChecked={item.isChecked}
                    />
                })
                : <EmptyCartMessage/>
            }
        </Stack>
    </Box>
}
