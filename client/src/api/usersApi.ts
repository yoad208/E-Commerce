import baseUrl from "./baseUrl";
import {IUser} from "../interfaces/IUser.interface";


export const getUsers = async (): Promise<IUser[]> => {
    const {data} = await baseUrl.get(`/users`)
    return data
}

export const postUser = async (newUser: IUser) => {
    const {data} = await baseUrl.post(`/users`, newUser)
    return data
}

export const updateUser = async (newUserData: IUser) => {
    const {data} = await baseUrl.put(`/users/${newUserData.id}`, newUserData)
    return data
}

export const deleteUser = async (id: string) => {
    const {data} = await baseUrl.delete(`/users/${id}`)
    return data
}
