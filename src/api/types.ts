import { BookState } from "../redux/books/books";
import { UseFormRegister, FieldValues, UseFormRegisterReturn, InternalFieldName, FieldErrors} from "react-hook-form";

export type Arrows = "Prev" | "Next";

export type InputModeType = 'text' | 'email' | 'password' ;

export type inpNameSignUpType = 'name' | 'email' | 'password' | 'confirmPassword';

export type SignUpForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export type SignInForm = {
    name: string;
    password: string;
}
export type AccountPageType = {
    name: string;
    email: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}
export interface InputType <TFieldValues extends FieldValues, TFieldName extends InternalFieldName> {
    inpName: inpNameSignUpType;
    inpMode: InputModeType;
    labelValue: string;
    value: string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    ref?: React.RefObject<HTMLInputElement>;
    register?: UseFormRegister<TFieldValues>; 
    validationRules?: UseFormRegisterReturn<TFieldName> | undefined; 
    errors?: FieldErrors<TFieldValues> | undefined;
}

export type authorisationType = "SIGN IN" | "SIGN UP";

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


