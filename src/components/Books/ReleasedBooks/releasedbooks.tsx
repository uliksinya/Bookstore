import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts"
import { selectReleasedBooks, fetchBooks, BookState} from "../../../redux/products/products";
import { BookCard } from "../BookCard/bookcard";
import styles from "./releasedbooks.module.scss"
import { useNavigate } from "react-router-dom";

export const ReleasedBooks = () => {   
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const books = useAppSelector(selectReleasedBooks);  

    useEffect(() => {
        if(books.length === 0){
            dispatch(fetchBooks());
        }   
    }, [dispatch, books]);
    
    const redirectToPostPage = (id: number) => {
        navigate(`/books/${id}`);
        console.log("переход на страницу книги");
    };

    return (
        <div className={styles.books_container}>
            {books.map((book: BookState) => (
                <div key={book.isbn13}>
                    <BookCard book={book} onClick={() => redirectToPostPage(Number(book.isbn13))}/>
                </div>
            ))}
        </div>
    );
}
