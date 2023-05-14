import {IShoppingCartItem} from "./IShoppingCartItem.interface";
import { StackProps} from "@chakra-ui/react";

export interface ICheckout extends StackProps{
    cartProducts: IShoppingCartItem[]
    cartQuantity: number
}