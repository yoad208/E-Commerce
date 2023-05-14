import {IShoppingCartItem} from "./IShoppingCartItem.interface";
import { StackProps} from "@chakra-ui/react";

export interface ICartTotalPrice extends StackProps{
    cartProducts: IShoppingCartItem[]
    cartQuantity: number
}