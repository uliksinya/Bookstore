import styles from "./bookcard.module.scss";
import {BookState} from "../../../redux/products/products"

export const BookCard = (book: BookState) => {
    return (
        <div className={styles.bookcard_container}>
            <div className={styles.background}>
                <img src={book.image} id={styles.book_image}/>
                <h3>{book.title}</h3>
                <h3>{book.price}</h3>
            </div>

        </div>
    )
}