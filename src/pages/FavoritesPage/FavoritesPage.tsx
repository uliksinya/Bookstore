import styles from "./favpage.module.scss";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../utils/img/arrow_icon.png";
import Grade from '../../utils/img/grade.png';
import { getBooksFromLS, removeFavBookFromLS } from "../../hooks/localStorage/favBooksLS";
import { favBookType } from "../../api/types";
import HeartIcon from "../../utils/img/heart_icon.png";
import { useState, useEffect } from "react";
import { removeFavouriteBook } from "../../redux/favouritesBooks/favBooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFavouriteBooks } from "../../redux/favouritesBooks/favBooks";
import { addFavouriteBook } from "../../redux/favouritesBooks/favBooks";

export const FavoritesPage = () => {    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [favBooks, setFavBooks] = useState(getBooksFromLS());
    const favBooksFromStore = useAppSelector(selectFavouriteBooks);

    useEffect(() => {        
        favBooks.forEach((book: favBookType) => {
            dispatch(addFavouriteBook(book));
        }); 
    }, []);
    
    const toggleNavigateToHome = () => {
        navigate('/books');
    }
    const toggleRemoveFromFavorites = (isbn: string) => {
        removeFavBookFromLS(isbn);
        dispatch(removeFavouriteBook(isbn));
        setFavBooks(getBooksFromLS());
    }
    useEffect(() => {
        const booksFromLS = getBooksFromLS();
        setFavBooks(booksFromLS);
    }, [setFavBooks]);
     
     console.log(favBooksFromStore);

    return(
        <div className={styles.favorites_container}>
            <div className={styles.img_container} onClick={toggleNavigateToHome}>
                <img src={ArrowIcon}/>
            </div>
            <div className={styles.single_title}>
                <h1>Favorites</h1>
            </div>
            <div className={styles.fav_books}>
                {favBooks.map((book: favBookType) => (
                    <div key={book.isbn13} className={styles.fav_books_line}>
                        <div className={styles.book_card}>
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
                                <div className={styles.price_grade}>
                                    <h3>{book.price}</h3>
                                    <div id={styles.grade}>
                                        <img src={Grade}/>
                                    </div>
                                </div>
                            </div>  
                            <div id={styles.like_img} onClick={() => toggleRemoveFromFavorites(book.isbn13)}>
                                <img src={HeartIcon}/>
                            </div>
                        </div>
                        <div className={styles.book_line}></div>           
                    </div>
                ))}
            </div>
        </div>   
    )
}