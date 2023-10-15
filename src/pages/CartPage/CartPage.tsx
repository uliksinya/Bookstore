import styles from "./cartpage.module.scss";
import { favBookType } from "../../types/types";
import { useState, useEffect } from 'react';
import { getBooksFromCartInLS } from "../../utils/localStorage/booksInCartLS";
import CartBookCard from '../../components/Cart/BookCardInCart/CartBookCard'
import {useMemo} from 'react'
import { FooterArr } from "../../types/types";
import { CartTotalFooter } from "../../components/Cart/CartTotalFooter/CartTotalFooter";
import { removeBookFromCartInLS } from "../../utils/localStorage/booksInCartLS";
import { removeBooksFromCartStore } from "../../redux/cart/booksincart";
import { useAppDispatch } from "../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";
import { selectBooksInCartStore } from "../../redux/cart/booksincart";
import Cart from '../../assets/img/cart.gif';
import { getSumTotal, getVatSum } from "../../utils/utilsFunctions/utilsFunctions";
import { ArrowBack } from "../../components/ArrowBack/ArrowBack";

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
export const CartPage = () => { 
    const dispatch = useAppDispatch();
    const booksInCartStore = useAppSelector(selectBooksInCartStore);
    const [booksInCart, setBooksInCart] = useState<favBookType[]>(getBooksFromCartInLS());
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
            <ArrowBack/>
            <div className={styles.single_title}>
                <h1>Your Cart</h1>
            </div>
            <div className={styles.fav_books}>
            {booksInCart.map((book: favBookType) => (
                <CartBookCard 
                    key={book.isbn13} 
                    singleBook={book} 
                    updateBookInCart={updateBookInCart} 
                    removeBook={() => toggleRemoveBook(book.isbn13)}
                />
            )).reverse()}
            </div>
            {
                booksInCart.length !== 0 
                ? 
                <div className={styles.cart_footer}>
                    <CartTotalFooter arr={footerInfArray} onClick={() => console.log("Нажали")} />
                </div>
                :
                <div className={styles.not_active_cart}>
                <div><h1>Your cart is empty!</h1></div>
                    <img id={styles.cart_img} src={Cart}/>
                </div>
            }            
        </div>
    )
}