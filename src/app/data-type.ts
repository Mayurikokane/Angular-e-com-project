export interface SignUs{
    name :string,
    Password :string,
    email:string
}
export interface login{
    Password :string,
    email:string
}
export interface product{
    name: string,
    price:number,
    category: string,
    color:string ,
    description:string,
    image: string,
    addProductMessage:string
    id:number,
    quantity:undefined | number,
    productId:undefined| number;

}
export interface SignUp{
    name :string,
    Password :string,
    email:string
}

export interface cart{
    name: string,
    price:number,
    category: string,
    color:string ,
    description:string,
    image: string,
    addProductMessage:string
    id:number | undefined,
    quantity:undefined | number;
    userId: number | undefined;
    productId:number;
}

export interface pricesummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
    
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number| undefined,
    id: number| undefined
  
}