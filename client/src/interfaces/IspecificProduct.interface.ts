import {IProducts} from "../interfaces/Iproducts.interface";

export interface ISpecificProduct extends IProducts {
    amount: number,
    description: string,
    itemSpecifics: {
        type?: string,
        material?: string,
        otherMaterial?: string,
        style?: string,
        department?: string
    }
}
