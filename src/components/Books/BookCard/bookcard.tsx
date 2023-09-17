import styles from "./bookcard.module.scss";
import {BookState} from "../../../redux/products/products"
import Grade from "../../../utils/img/grade.png";


export const BookCard = (book: BookState) => {
    return (
        <div className={styles.bookcard_container}>
            <div className={styles.background}>
                <img src={book.image} id={styles.book_image}/>
                <h3 id={styles.title}>{book.title}</h3>
                <div className={styles.author_data}>
                    <p>by Lentin Joseph, Apress 2018</p>                    
                </div>  
                <div className={styles.bookcard_footer}>
                    <h3>{book.price}</h3>
                    <div>
                        <img src={Grade}/>
                    </div>
                </div>             
            </div>
        </div>
    )
}