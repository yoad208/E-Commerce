import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteUser, getUsers, postUser, updateUser} from "../api/usersApi";
import {IUser} from "../interfaces/IUser.interface";
import {useGenerateToken} from "../hooks/useGenerateToken";

export const useLogin = () => {

    const queryClient = useQueryClient()
    const {generateToken} = useGenerateToken()
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
            if (userExist) return generateToken({email: userExist.email})
            if (!userExist && user.provider === "google") return postUser(user).then(res => {
                generateToken({email: res.email}).then()
            })
            return postUser(user)
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
