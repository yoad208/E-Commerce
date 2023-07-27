import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuthUser} from "react-auth-kit";
import {getOrders, addNewOrder, cancelOrder, updateOrder} from "../api/ordersApi";
import {IOrders} from "../interfaces/IOrders.interface";

export const useOrders = () => {

    const queryClient = useQueryClient()
    const auth = useAuthUser()

    const {
        data: ordersList,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['orders', {userID: auth()?.id}],
        queryFn: () => getOrders(auth()?.id),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
        enabled: true
    })


    const {mutate: addOrder} = useMutation({
        mutationFn: addNewOrder,
        onSuccess: () => {
            return queryClient.invalidateQueries(['orders'])
        }
    })

    const {mutate: updateSpecificOrder} = useMutation({
        mutationFn: updateOrder,
        onMutate: (order: IOrders) => {
            queryClient.setQueryData(['orders', order.id], order)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['orders'])
        }
    })

    const {mutate: cancelSpecificOrder} = useMutation({
        mutationFn:(order: IOrders) => cancelOrder(order),
        onMutate: (order: IOrders) => {
            queryClient.cancelQueries(['orders', order.id]).then()

            const prevData = queryClient.getQueryData(['orders', order.id])

            if (prevData) {
                queryClient.setQueryData(['orders', order.id], order)
            }
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['orders'])
        }
    })


    return {
        ordersList,
        isLoading,
        isError,
        error,
        addOrder,
        updateSpecificOrder,
        cancelSpecificOrder
    }
}
