import { BookState } from "../../redux/books/books";

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

export type Arrows = "Prev" | "Next";