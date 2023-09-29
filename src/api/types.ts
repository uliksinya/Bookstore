import { BookState } from "../redux/books/books";
import { useSearchParams } from "react-router-dom";

export type Arrows = "Prev" | "Next";
type InputMode = 'text' | 'email' | 'password';

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

export interface InputType {
    name: string;
    inputMode: InputMode;
    labelValue: string;
    // value: string | number;
    // placeholder?: string | undefined;
    // disabled?: boolean;   
    // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
    // errors?: FieldErrors<TFieldValues> | undefined;
    // validationSchema?: UseFormRegisterReturn<TFieldName> | undefined; 
}

export type SignUpForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
