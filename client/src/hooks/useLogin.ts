import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteUser, getUsers, postUser, updateUser} from "../api/usersApi";
import {IUser} from "../interfaces/IUser.interface";


export const useLogin = () => {

    const queryClient = useQueryClient()

    const {
        data: usersData,
        isError,
        error,
        isLoading
    } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    })

    const {mutate: addUser} = useMutation({
        mutationFn: (user: IUser) => {
            let userExist = usersData?.find(u => u.email === user.email);
            if (!userExist) return postUser(user)
            return Promise.reject("User already exists")
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['users'])
        }
    })

    const {mutate: updateSpecificUser} = useMutation({
        mutationFn: updateUser,
        onMutate: (userData) => {
            return queryClient.setQueryData(['users', userData.id], userData)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['users'])
        }
    })

    const {mutate: deleteSpecificUser} = useMutation({
        mutationFn: deleteUser,
        onMutate: (id) => {
            return queryClient.cancelQueries(['users', id])
        },
        onSuccess: (id) => {
            return queryClient.invalidateQueries(['users', id])
        }
    })

    return {
        usersData,
        isError,
        error,
        isLoading,
        addUser,
        updateSpecificUser,
        deleteSpecificUser
    }
}
