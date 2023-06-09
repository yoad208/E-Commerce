import {IProducts} from "../interfaces/Iproducts.interface";
import {IWishListItem} from "../interfaces/IWishList.interface";
import {useProducts} from "./useProducts";

export const useSortBy = () => {
     const sortBy = (products: IProducts[], sortType: string) => {
        if (sortType === "Price Low To High") {
            return (products?.sort((a, b) => {
                return a.price - b.price
            }))
        } else if (sortType === "Price High To Low") {
            return (products?.sort((a, b) => {
                return b.price - a.price
            }))
        } else if (sortType === "Recently Added") {
            return (products?.sort((a, b) =>{
                return (Number(a.id) > Number(b.id)) ? -1 : 1
            }))
        } else if (sortType === "Recommended") {
            return (products.sort((a, b) => {
                return (Number(a.id) < Number(b.id)) ? -1 : 1
            }))
        }
    }

    return {sortBy}
}


