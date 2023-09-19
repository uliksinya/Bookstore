import { useAppSelector } from "../../../redux/hooks.ts";
import { selectFoundedBooks, BookState} from "../../../redux/products/products";
import { IBookCard } from "../../api/types.ts";
import { BookCard } from "../BookCard/bookcard";
import styles from "./searchedbooks.module.scss";
import { useNavigate } from "react-router-dom";

export const SearchedBooks = () => {
    const searchedBooks = useAppSelector(selectFoundedBooks);   
    const navigate = useNavigate();
    const redirectToPostPage = (id: number) => {
        navigate(`/books/${id}`);
        console.log("В redirectToBookPage");
    };

    return (
        <div className={styles.books_content_container}>
            {searchedBooks.map((book: BookState) => (
                <div key={book.isbn13}>
                    <BookCard book={book} onClick={() => redirectToPostPage(Number(book.isbn13))}/>
                </div>
            ))}
        </div>
    );
}
