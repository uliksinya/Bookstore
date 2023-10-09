import ArrowIcon from "../../utils/img/arrow_icon.png";
import styles from "./cartpage.module.scss";
import { useNavigate } from "react-router-dom";
import { favBookType } from "../../api/types";
import { useState, useEffect } from 'react';
import { getBooksFromCartInLS } from "../../hooks/localStorage/booksInCartLS";
import CartBookCard from "../../components/BookCardInCart/BookCardInCart";
import {useMemo} from 'react'

interface FooterArr{
    title: string;
    price: string;
}
export const CartPage = () => {
    const [booksInCart, setBooksInCart] = useState<favBookType[]>([]);
    const navigate = useNavigate();   
    const toggleNavigateToHome = () => {
        navigate('/books');
    }
    //const footerInfArray: FooterArr[] = useMemo(() => getCartFooterArray(booksInCart), [booksInCart]);
    const getCartFooterArray = (books: favBookType[]) => {
        const totalPrice = books.reduce((total, book) => total + Number(book.price), 0);
        return totalPrice;
    }
    useEffect(() => {
        const booksFromLS = getBooksFromCartInLS();
        setBooksInCart(booksFromLS);
    }, [setBooksInCart]);
    return(
        <div className={styles.cart_container}>
            <div className={styles.img_container} onClick={toggleNavigateToHome}>
                <img src={ArrowIcon}/>
            </div>
            <div className={styles.single_title}>
                <h1>Your Cart</h1>
            </div>
            <div className={styles.fav_books}>
                {booksInCart.map((book: favBookType) => (
                    <CartBookCard key={book.isbn13} singleBook={book}/>
                ))}
            </div>
            <div>{getCartFooterArray(booksInCart)}</div>
        </div>
    )
}