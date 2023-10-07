import styles from "./favpage.module.scss";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../utils/img/arrow_icon.png";
import { useAppSelector } from "../../redux/hooks";
import { selectFavouriteBooks } from "../../redux/favouritesBooks/favBooks";
import Grade from '../../utils/img/grade.png';

export const FavoritesPage = () => {
    const favBooks = useAppSelector(selectFavouriteBooks);
    const navigate = useNavigate();
    const toggleNavigateToHome = () => {
        navigate('/books');
    }
    //onClick={() => redirectToPostPage(Number(book.isbn13))}
    return(
        <div className={styles.favorites_container}>
            <div className={styles.img_container} onClick={toggleNavigateToHome}>
                <img src={ArrowIcon}/>
            </div>
            <div className={styles.single_title}>
                <h1>Favorites</h1>
            </div>
            {favBooks.map((book) => (
                <div className={styles.book_card} key={book.isbn13}>
                    <div className={styles.background}>
                        <img src={book.image} className={styles.book_img}/>                       
                    </div>  
                    <div className={styles.text_container}>
                        <h3 id={styles.bookcard_title}>
                            {book.title}
                        </h3>
                        <div className={styles.author_data}>
                            <p>{book.subtitle}</p>                    
                        </div> 
                        <div>
                            <h3>{book.price}</h3>
                            <div>
                                <img src={Grade}/>
                            </div>
                        </div>
                    </div>             
                </div>
            ))}
        </div>
        
    )
}