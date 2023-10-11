import ArrowIcon from "../../utils/img/arrow_icon.png";
import styles from "./cartpage.module.scss";
import { useNavigate } from "react-router-dom";
import { favBookType } from "../../api/types";
import { useState, useEffect } from 'react';
import { getBooksFromCartInLS } from "../../hooks/localStorage/booksInCartLS";
import CartBookCard from "../../components/Cart/BookCardInCart/CartBookCard";
import {useMemo} from 'react'
import { FooterArr } from "../../api/types";
import { CartTotalFooter } from "../../components/Cart/CartTotalFooter/CartTotalFooter";
import { removeBookFromCartInLS } from "../../hooks/localStorage/booksInCartLS";
import { removeBooksFromCartStore } from "../../redux/cart/booksincart";
import { useAppDispatch } from "../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";
import { selectBooksInCartStore } from "../../redux/cart/booksincart";
import { addBookToCartStore } from "../../redux/cart/booksincart";

export const CartPage = () => {
    const navigate = useNavigate();   
    const dispatch = useAppDispatch();
    const booksInCartStore = useAppSelector(selectBooksInCartStore);

    const [booksInCart, setBooksInCart] = useState<favBookType[]>(getBooksFromCartInLS());
 
    const toggleNavigateToHome = () => {
        navigate('/books');
    }    
    const getSumTotal = (books: favBookType[]) => {
        const totalSumPrice = books.reduce((total, book) => total + Number(book.price), 0);
        return totalSumPrice;
    }
    const getVatSum = (sum: number) => {
        return sum * 0.2;
    }
    useEffect(() => { 
        booksInCart.forEach(book => {
            dispatch(addBookToCartStore(book));
        });
    }, []);

    const getCartFooterArray = (books: favBookType[]) => {
        const sum : number = getSumTotal(books);
        const vat : number = getVatSum(sum);
        const totalSum : number = sum + vat;
        return [
            {
                title: 'Sum Total',
                price: '$ ' + sum.toFixed(2),
            },
            {
                title: 'VAT',
                price: '$ ' + vat.toFixed(2),
            },
            {
                title: 'Total',
                price: '$' + totalSum.toFixed(2),
            }
        ]
        
    }
    const footerInfArray: FooterArr[] = useMemo(() => getCartFooterArray(booksInCart), [booksInCart]);

    const updateBookInCart = (isbn: string, newQuantity: number, newPrice:number) => {
        const updatedBooks = booksInCart.map(book => {
          if (book.isbn13 === isbn) {
            book.quantity = newQuantity;
            book.price = newPrice.toFixed(2);
          }
          return book;
        });
        setBooksInCart(updatedBooks);
    }
    const toggleRemoveBook = (isbn: string) => {
        removeBookFromCartInLS(isbn)
        dispatch(removeBooksFromCartStore(isbn));
    }
    useEffect(() => {   
        setBooksInCart(getBooksFromCartInLS());
    }, [booksInCartStore]);
    return(
        <div className={styles.cart_container}>
            <div className={styles.img_container} onClick={toggleNavigateToHome}>
                <img src={ArrowIcon}/>
            </div>
            <div className={styles.single_title}>
                <h1>Your Cart</h1>
            </div>
            <div className={styles.fav_books}>
                {booksInCart.reverse().map((book: favBookType) => (
                    <CartBookCard 
                        key={book.isbn13} 
                        singleBook={book} 
                        updateBookInCart={updateBookInCart} 
                        removeBook={() => toggleRemoveBook(book.isbn13)}
                    />
                ))}
            </div>
            <div className={styles.cart_footer}>
                <CartTotalFooter arr={footerInfArray} onClick={() => console.log("Нажали")} />
            </div>
        </div>
    )
}