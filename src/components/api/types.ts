import { BookState } from "../../redux/products/products";

export interface Book {
    title: string,
    isbn13: string,
    price: string,
    image: string,
}

export interface IBookCard{
    onClick: () => void;
    book: BookState;
}