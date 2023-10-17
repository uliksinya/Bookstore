import styles from "./favpage.module.scss";
import { getBooksFromLS, removeFavBookFromLS } from "../../utils/localStorage/favBooksLS";
import { favBookType } from "../../types/types";
import HeartIcon from "../../assets/img/heart_2.png";
import { useState, useEffect } from "react";
import { removeFavouriteBook } from "../../redux/favouritesBooks/favBooks";
import { useAppDispatch } from "../../redux/hooks";
import DarkLike from "../../assets/img/dark_like.png";
import HeartGif from "../../assets/img/heart_gif_icon.gif";
import { PaginationReleasedBooks } from "../../components/PaginationReleasedBooks/PaginationReleasedBooks";
import { ArrowBack } from "../../components/ArrowBack/ArrowBack";
import { GradeContainer } from "../../components/GradeContainer/GradeContainer";

export const FavoritesPage = () => {    
    const dispatch = useAppDispatch();

    const [favBooks, setFavBooks] = useState<favBookType[]>(getBooksFromLS()); 
    
    const toggleRemoveFromFavorites = (isbn: string) => {
        removeFavBookFromLS(isbn);
        dispatch(removeFavouriteBook(isbn));
        setFavBooks(getBooksFromLS());
    }
    useEffect(() => {
        const booksFromLS = getBooksFromLS();
        setFavBooks(booksFromLS);
    }, [setFavBooks]);   

    return(
        <div className={styles.favorites_container}>
            <ArrowBack/>
            <div className={styles.single_title}>
                <h1>Favorites</h1>
            </div>
            {favBooks.length !== 0 ?
            <div className={styles.fav_books}>
                {favBooks.map((book: favBookType) => (
                    <div key={book.isbn13} className={styles.fav_books_line}>
                        <div className={styles.book_card}>
                            <div className={styles.background}>
                                <img src={book.image} className={styles.book_img}/>
                                <img src={DarkLike} id={styles.dark_like_img} onClick={() => toggleRemoveFromFavorites(book.isbn13)}/>                     
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
                                        <GradeContainer bookRating={book.rating}/>
                                    </div>
                                </div>
                            </div>  
                            <div id={styles.like_img} onClick={() => toggleRemoveFromFavorites(book.isbn13)}>
                                <img src={HeartIcon}/>
                            </div>
                        </div>
                        <div className={styles.book_line}></div>           
                    </div>
                )).reverse()}
            </div>
            :
            <div className={styles.not_favorites_page}>
                <h1>You don't have any favorites!</h1>
                <img src={HeartGif}/>
            </div>
            }
            <div className={styles.pagination_container}>
                <PaginationReleasedBooks title={'Popular Books'} />
            </div>
        </div>   
    )
}