export interface IProducts {
    id: string,
    categoryID: string,
    productName: string,
    price: number,
    picture: string,
    rating: number,
    inStock: boolean,
    isFav: boolean,
    sizes: string[],
    colors: string[]
}