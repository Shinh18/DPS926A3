export interface Topping {
    title: string;
    price: number;
}

export interface Size {
    title: string;
    price: number;
}

export interface Pizza {
    size: string;
    topping: string;
    quantity: number;
    price: number;
}

export interface Order {
    totalPrice: number;
    totalQuantity: number;
    pizzaList: Pizza[]
}

export interface History extends Order{
    date: Date;
}