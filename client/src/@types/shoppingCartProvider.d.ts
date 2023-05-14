import {IShoppingCartItem} from "../interfaces/IShoppingCartItem.interface";

export interface IShoppingCartProvider {
    userShoppingCart: IShoppingCartItem[],
    cartQuantity: number
    AddToShoppingCart: ({id, color, size, quantity}: IShoppingCartItem) => void
    DecreaseItemQuantity: (itemID: Date) => void
    RemoveFromShoppingCart: (itemID: Date) => void
}