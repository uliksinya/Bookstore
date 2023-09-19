import { BookState } from "../../redux/products/products";

export interface IBookCard{
    onClick: () => void;
    book: BookState;
}