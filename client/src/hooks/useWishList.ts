import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addWishListItem, deleteWishListItem, getWishList} from "../api/wishListApi";

export const useWishList = () => {

    const queryClient = useQueryClient()
    const {
        data: wishListData,
        isError,
        error,
        isLoading
    } = useQuery({
        queryKey: ['wishList'],
        queryFn: getWishList,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    })

    const wishListQuantity: number = wishListData?.length ?? 0

    const {mutate: addToWishList} = useMutation({
        mutationFn: addWishListItem,
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
