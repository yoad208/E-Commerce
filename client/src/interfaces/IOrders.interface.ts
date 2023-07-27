import {IShoppingCartItem} from "./IShoppingCartItem.interface";
import {IAddress} from "./IUser.interface";

export interface IOrders {
    id: string
    status: "active" | "in-progress" | "cancelled"
    userId: string
    payer: {
        name: string
        email: string
        phone: string
    }
    address: IAddress
    amount: {
        totalPrice: number
        currency: string
    }
    createdAt: Date
    updatedAt: Date
    products: IShoppingCartItem[]
}
