import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts"
import { selectReleasedBooks, fetchBooks, BookState} from "../../../redux/products/products";
import { BookCard } from "../BookCard/bookcard";
import styles from "./releasedbooks.module.scss"
import { useNavigate } from "react-router-dom";

interface ReleasedBooksProps{
    activeNum: number;
}
export const ReleasedBooks = ({activeNum}: ReleasedBooksProps) => {   
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

    let selectedArray:BookState[] = [];

    switch (activeNum) {
        case 1:
            selectedArray = books.slice(0, 6);
            break;
        case 2:
            selectedArray = books.slice(6, 12);
            break;
        case 3:
            selectedArray = books.slice(12, 18);
            break;
        case 4:
            selectedArray = books.slice(18);
            break;
        default:
            selectedArray = [];
            break;
    }

    return (
        <div className={styles.books_content_container}>
            {selectedArray.map((book: BookState) => (
                <div key={book.isbn13}>
                    <BookCard book={book} onClick={() => redirectToPostPage(Number(book.isbn13))}/>
                </div>
            ))}
        </div>
    );
}
