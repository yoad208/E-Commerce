import {IProducts} from "../interfaces/Iproducts.interface";
import {IWishListItem} from "../interfaces/IWishList.interface";
import {useProducts} from "./useProducts";

export const useSortBy = () => {
    const {productsArray} = useProducts()
     const sortBy = (products: IProducts[] | IWishListItem[], sortType: string) => {
        if (sortType === "Price Low To High") {
            return (products?.sort((a, b) => {
                const first = productsArray?.find((i: IProducts) => (i.id === a.id))
                const second = productsArray?.find((i: IProducts) => (i.id === b.id))
                return first.price - second.price
            }))
        } else if (sortType === "Price High To Low") {
            return (products?.sort((a, b) => {
                const first = productsArray?.find((i: IProducts) => (i.id === a.id))
                const second = productsArray?.find((i: IProducts) => (i.id === b.id))
                return second.price - first.price
            }))
        } else if (sortType === "Recently Added") {
            return (products?.sort((a, b) =>{
                const first = productsArray?.find((i: IProducts) => (i.id === a.id))
                const second = productsArray?.find((i: IProducts) => (i.id === b.id))
                return (Number(first.id) > Number(second.id)) ? -1 : 1
            }))
        } else if (sortType === "Recommended") {
            return (products.sort((a, b) => {
                const first = productsArray?.find((i: IProducts) => (i.id === a.id))
                const second = productsArray?.find((i: IProducts) => (i.id === b.id))
                return (Number(first.id) < Number(second.id)) ? -1 : 1
            }))
        }
    }

    return {sortBy}
}


