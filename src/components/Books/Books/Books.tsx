//import { useEffect, useState, useMemo } from "react";
import { BookState} from "../../../redux/books/books.ts";
import { BookCard } from "../BookCard/Bookcard.tsx";
import styles from "./Books.module.scss"
import { useNavigate } from "react-router-dom";
import { BooksProps } from "../../../api/types.ts";

export const Books = ({ booksArr} : BooksProps) => {  
    const navigate = useNavigate();    
    const redirectToPostPage = (id: number) => {
        navigate(`/books/${id}`);
    };
    return (
        <div className={styles.grid_container}>
            <div className={styles.books_content_container}>
                {booksArr.map((book: BookState) => (
                    <div key={book.isbn13} className={styles.book_card}>
                        <BookCard book={book} onClick={() => redirectToPostPage(Number(book.isbn13))}/>                   
                    </div>
                ))}
            </div>
            <div className={styles.books_line}></div>
        </div>
    );
}
    