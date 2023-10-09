import { useAppSelector } from "../../redux/hooks"
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchSelectedBook } from "../../redux/books/books";
import { useNavigate, useParams } from "react-router-dom";
import { selectSelectedBook } from "../../redux/books/books";
import ArrowIcon from "../../utils/img/arrow_icon.png";
import styles from "./singlepage.module.scss"
import Grade from "../../utils/img/grade.png";
import { Tabs } from "../../components/Tabs/tabs";
import { Button } from "../../components/Button/Button";
import FacebookIcon from "../../utils/img/facebook_icon.png";
import TwitterIcon from "../../utils/img/twitter_icon.png";
import MenuIcon from "../../utils/img/horiz_menu_icon.png";
import { Subscribe } from "../../components/Subscribe/subscribe";
import {ButtonFavourite} from "../../components/ButtonFavorite/Buttonfavourite";
import { selectFavouriteBooks} from "../../redux/favouritesBooks/favBooks";
import { addFavBookToLS, removeFavBookFromLS , isThisBookInFavLS } from "../../hooks/localStorage/favBooksLS";
import { addBookToCartInLS } from "../../hooks/localStorage/booksInCartLS";
 
export const SinglePage = () => {
    const id = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const book = useAppSelector(selectSelectedBook);
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    const [isFavouriteBook, setIsFavouriteBook] = useState<boolean>(false);
    const favBooks = useAppSelector(selectFavouriteBooks);

    const toggleEditState = () => {
        setIsMenuActive(!isMenuActive);
    }
    const toggleNavigateToHome = () => {
        navigate('/books');
    }
    const toggleEditFavBookState = () => {
        setIsFavouriteBook(!isFavouriteBook);
    }
    const addBookToLsCart = () => {
        const isbn = book.isbn13;
        addBookToCartInLS(isbn, favBookObj);
    }
    
    const priseWithoutDollar = book.price.replace('$', '');
    console.log(priseWithoutDollar);
    const favBookObj = {
        isbn13: book.isbn13,
        title: book.title,
        subtitle: book.subtitle,
        rating: book.rating,
        price: priseWithoutDollar,
        quantity: 1,
        image: book.image,
    }
    console.log(favBookObj.price);

    useEffect(() => {
        if(id.bookid !== undefined){
            dispatch(fetchSelectedBook(id.bookid));  
        }
    }, [dispatch]);
    
    console.log(book.isbn13);

    useEffect(() => {
        if (book.isbn13) {
            const isbn = book.isbn13;

            if (isThisBookInFavLS(isbn)) {
                setIsFavouriteBook(true);
            } else {
                setIsFavouriteBook(false);
            }
        }
    }, [book.isbn13]);
    
    useEffect(() => {
        const isbn = book.isbn13;
    
        if (isFavouriteBook) {
            addFavBookToLS(isbn, favBookObj);
        } else {
            removeFavBookFromLS(isbn);
        }

    }, [isFavouriteBook]);     

    console.log(favBooks);    

    return(
        <div>
            <div className={styles.content_container}>
                <div className={styles.img_container} onClick={toggleNavigateToHome}>
                    <img src={ArrowIcon}/>
                </div>
                <div className={styles.single_title}>
                    <h1>{book.title}</h1>
                </div>
                <div className={styles.book_desription}>
                    <div className={styles.img_background}>
                        <div className={styles.like_component}>
                            <ButtonFavourite isFavourite={isFavouriteBook} editFavStateFunc={() => toggleEditFavBookState()}/>
                        </div>                        
                        <div className={styles.book_img}><img src={book.image}/></div>
                    </div>
                    <div className={styles.book_information}>
                        <div className={styles.grade}>
                            <h2>{book.price}</h2>
                            <div><img src={Grade}/></div>
                        </div>
                        <ul className={styles.main_menu}>
                            <li>
                                <div><p id={styles.title}>Authors</p></div>
                                <div><p id={styles.descr}>{book.authors}</p></div>
                            </li>
                            <li>
                                <div><p id={styles.title}>Publisher</p></div>
                                <div><p id={styles.descr}>{book.publisher}</p></div>
                            </li>
                            <li>
                                <div><p id={styles.title}>Language</p></div>
                                <div><p id={styles.descr}>{book.language}</p></div>
                            </li>
                            <li>
                                <div><p id={styles.title}>Formar</p></div>
                                <div><p id={styles.descr}>Paper book / ebook (PDF)</p></div>
                            </li>
                        </ul>
                        {isMenuActive 
                        ? 
                        <ul className={styles.additionally_menu}><p onClick={toggleEditState}>More detalize</p>
                            <li>
                                <div><p id={styles.title}>Pages</p></div>
                                <div><p id={styles.descr}>{book.pages}</p></div>
                            </li>
                            <li>
                                <div><p id={styles.title}>About book</p></div>
                                <div><p id={styles.descr}>{book.subtitle}</p></div>
                            </li>
                            <li>
                                <div><p id={styles.title}>Year</p></div>
                                <div><p id={styles.descr}>{book.year}</p></div>
                            </li>                       
                        </ul>
                        :
                        <ul className={styles.menu}><p id={styles.menu} onClick={toggleEditState}>More detalize</p></ul> }    
                        <Button disabled={false} content={"Add to cart"} btnStyle={"dark"} onClick={() => addBookToLsCart()}/>                
                    </div>
                </div>            
            </div>
            <Tabs/>
            <div className={styles.book_description}>
                <span id={styles.single_desc}>{book.desc}</span>
            </div>
            <div className={styles.icons_container}>
                <div><img src={FacebookIcon}/></div>
                <div><img src={TwitterIcon}/></div>
                <div><img src={MenuIcon}/></div>                
            </div>
            <Subscribe/>
        </div>        
    )
}