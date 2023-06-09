export interface IProducts {
    id: string,
    categoryID: string,
    productName: string,
    price: number,
    picture: string,
    rating: number,
    inStock: boolean,
    sizes: string[],
    colors: string[]
}
