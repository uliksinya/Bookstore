import { useAppSelector } from "../../../redux/hooks.ts"
import { selectFoundedBooks, BookState} from "../../../redux/products/products";
import { BookCard } from "../BookCard/bookcard";
import styles from "./searchedbooks.module.scss"

export const SearchedBooks = () => {
    const searchedBooks = useAppSelector(selectFoundedBooks);   

    return (
        <div className={styles.books_container}>
            {searchedBooks.map((book: BookState) => (
                <div key={book.isbn13}>
                    <BookCard title={book.title} subtitle={book.subtitle} price={book.price} image={book.image}/>
                </div>
            ))}
        </div>
    );
}
