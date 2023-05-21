interface IAddress {
    id: string
    userId: string
    city: string
    street: string
    zipCode: string
    country: string
    state: string
    createdAt: Date
    updatedAt: Date
}

export interface IUser {
    id: string
    userName: string
    email: string
    phone: string
    password: string
    role: string
    createdAt: Date
    updatedAt: Date
    address: IAddress[]
}
