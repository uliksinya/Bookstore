import { useAppSelector } from "../../../redux/hooks.ts";
import { selectFoundedBooks, BookState} from "../../../redux/books/books.ts";
import { BookCard } from "../BookCard/bookcard";
import styles from "./searchedbooks.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks.ts"
import { selectReleasedBooks, fetchBooks} from "../../../redux/books/books.ts";

interface ReleasedBooksProps{
    activeNum: number;
}
export const SearchedBooks = ({activeNum}: ReleasedBooksProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const searchedBooks = useAppSelector(selectFoundedBooks);   

    useEffect(() => {
        if(searchedBooks.length === 0){
            dispatch(fetchBooks());
        }   
    }, [dispatch, searchedBooks]);
    
    const redirectToPostPage = (id: number) => {
        navigate(`/books/${id}`);
        console.log("переход на страницу книги");
    };  

    let selectedArray:BookState[] = [];

    switch (activeNum) {
        case 1:
            selectedArray = searchedBooks.slice(0, 6);
            break;
        case 2:
            selectedArray = searchedBooks.slice(6, 12);
            break;
        case 3:
            selectedArray = searchedBooks.slice(12, 18);
            break;
        case 4:
            selectedArray = searchedBooks.slice(18);
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
