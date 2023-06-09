import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addWishListItem, deleteWishListItem, getWishList} from "../api/wishListApi";
import {IWishListItem} from "../interfaces/IWishList.interface";
import {useAuthUser} from "react-auth-kit";

export const useWishList = () => {

    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const {
        data: wishListData,
        isError,
        error,
        isLoading
    } = useQuery({
        queryKey: ['wishList',{userID: auth()?.id}],
        queryFn: () => getWishList(auth()?.id),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    })

    const wishListQuantity: number = wishListData?.length ?? 0

    const {mutate: addToWishList} = useMutation({
        mutationFn: (newItem: IWishListItem) => {
            let item: IWishListItem | undefined = wishListData?.find(i => newItem.productID === i.productID)

            if (!item) return addWishListItem(newItem)
            return Promise.reject("Item already in wishlist")
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['wishList'])
        }
    })

    const {mutate: deleteFromWishList} = useMutation({
        mutationFn: deleteWishListItem,
        onMutate: (id) => {
            return queryClient.cancelQueries(['wishList', id])
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['wishList'])
        }
    })

    return {
        wishListData,
        isError,
        error,
        isLoading,
        addToWishList,
        deleteFromWishList,
        wishListQuantity
    }
}
