import React, {FC, useContext, useMemo, useState} from 'react';
import {Button, Divider, Heading, HStack, Stack, Text} from "@chakra-ui/react";
import {formatCurrency} from "../../../utilities/formatCurrency";
import {ICartTotalPrice} from "../../../interfaces/ICartTotalPrice.interface";
import {useProducts} from "../../../hooks/useProducts";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {IShoppingCartItem} from "../../../interfaces/IShoppingCartItem.interface";

export const CartTotalPrice: FC<ICartTotalPrice> = ({cartProducts, cartQuantity, ...rest}) => {

    const {productsArray} = useProducts()

    const cartTotal = useMemo(() => {
        return cartProducts.reduce((totalCart: number, item: IShoppingCartItem) =>
            (item.isChecked ? item.quantity : 0) + totalCart, 0
        )
    }, [cartQuantity, cartProducts])

    return <Stack gap={2} pt={2}>
        <HStack justify={"space-between"}>
            <HStack>
                <Text fontWeight={"bold"}>
                    Cart Total:
                </Text>
                <Text color={"blackAlpha.500"}>({cartTotal} items)</Text>
            </HStack>
            <Text
                fontWeight={"bold"}
                fontSize={20}
            >
                {
                    formatCurrency(
                        cartProducts?.reduce((total, cartItem) => {
                            const item = productsArray?.find((i: IProducts) => (i.id === cartItem.id && cartItem.isChecked))
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                    )
                }
            </Text>
        </HStack>
    </Stack>
}
