import baseUrl from "./baseUrl";
import {IWishListItem} from "../interfaces/IWishList.interface";
import {ErrorInfo} from "react";


export const getWishList = async () :Promise<IWishListItem[]> => {
    const response = await baseUrl.get("/wishlist");
    return response.data
}

export const addWishListItem = async (product: IWishListItem) :Promise<IWishListItem | undefined> => {
    try {
        const existingItem = await getWishList().then(res =>
            res.find((i: IWishListItem) => i.id === product.id)
        )
        if (existingItem) {
            return existingItem
        } else {
            const response = await baseUrl.post("/wishList", product);
            return response.data
        }
    } catch (e) {
        console.log(e)
    }
}

export const updateWishListItem = async (product: IWishListItem) :Promise<IWishListItem> => {
    const response = await baseUrl.put(`/wishList/${product.id}`, product);
    return response.data
}

export const deleteWishListItem = async (id: string) :Promise<any> => {
    const response = await baseUrl.delete(`/wishList/${id}`);
    return response.data
}
