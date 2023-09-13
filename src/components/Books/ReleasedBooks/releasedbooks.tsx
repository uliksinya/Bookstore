import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts"
import { selectBooks, fetchBooks, BookState, fetchFoundedBooks} from "../../../redux/products/products";
import { BookCard } from "../BookCard/bookcard";
import styles from "./releasedbooks.module.scss"
import { useSearchParams } from "react-router-dom";

export const ReleasedBooks = () => {
    const books = useAppSelector(selectBooks);
    console.log(books);
    
    const dispatch = useAppDispatch();
    // const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(books.length === 0){
            dispatch(fetchBooks());
        }   
    }, [dispatch, books]);

    // useEffect(() => {
    //    const stringParams = searchParams.toString();
    //    dispatch(fetchFoundedBooks(stringParams))
    // }, [searchParams]);

    // const handleSearchInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchParams((prevParams) => {
    //         if(!e.target.value.length){
    //             prevParams.delete("name");
    //         }
    //         else{
    //             prevParams.set("name", e.target.value);
    //         }
    //         return prevParams;
    //     });
    // }
    return (
        <div className={styles.books_container}>
            {books.map((book: BookState) => (
                <div key={book.isbn13}>
                    <BookCard title={book.title} subtitle={book.subtitle} price={book.price} image={book.image}/>
                </div>
            ))}
        </div>
    );
}
