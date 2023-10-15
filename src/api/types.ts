import { BookState } from "../redux/books/books";
import { UseFormRegister, FieldValues, UseFormRegisterReturn, InternalFieldName, FieldErrors} from "react-hook-form";

export type Arrows = "Prev" | "Next";
export type InputModeType = 'text' | 'email' | 'password' ;
export type inpNameSignUpType = 'name' | 'email' | 'password' | 'confirmPassword';
export type myMod = 'search' | 'subscribe' | 'forforms';
export type BooksDescrType = 'Description' | 'Authors' | 'Rewiews';
export type authorisationType = "SIGN IN" | "SIGN UP";

export const palette = ['purple', 'orange', 'green', 'blue'];

export interface SignUpForm{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface SignInForm{
    name: string;
    password: string;
}
export interface SubscribeEmailForm{
    email: string;
}
export interface ResetPasswordForm{
    name: string;
}
export interface NewPasswordForm{
    name: string;
    newPassword: string;
    confirmNewPassword: string;
}
export interface AccountPageType{
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
export interface favBookType{
    isbn13: string;
    title: string;
    subtitle: string;
    rating: string;
    price: string;
    startPrice: string;
    image: string;
    quantity: number;
}
export interface FooterArr{
    title: string;
    price: string;
}
export interface registrationProps{
    username: string;
    email: string;
    password: string;
}

export interface tabsProps{
    activeTab: BooksDescrType;    
    setActiveTab: (str: BooksDescrType) => void;   
}  
export interface BooksProps{
    booksArr: BookState[];
}
export interface favouriteProps{
    isFavourite: boolean;
    editFavStateFunc: () => void;
}
export interface CartBookCardProps {
    singleBook: favBookType;
    updateBookInCart: (isbn: string, newQuantity: number, newPrice: number) => void;
    removeBook: (isbn: string) => void,
}
export interface BurgMenuProps{
    onClick: () => void;
}
export interface PaginationProps{
    activeNum: number;    
    activeArrow: Arrows; 
    setActiveNum: (num: number) => void;
    setActiveArrow: (str: Arrows) => void;
}  
export interface SignInUpTabsProps{
    activeTab: authorisationType;    
    setActiveTab: (str: authorisationType) => void;   
}  



