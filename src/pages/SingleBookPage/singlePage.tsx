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
import { addFavouriteBook, removeFavouriteBook } from "../../redux/favouritesBooks/favBooks";
import { addBookToCartStore } from "../../redux/cart/booksincart";
import { selectBooksInCartStore } from "../../redux/cart/booksincart";
import ActiveStar from "../../utils/img/active_star.png";
import NotActiveStar from "../../utils/img/not_active_star.png";
 
export const SinglePage = () => {
    const id = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const booksInCart = useAppSelector(selectBooksInCartStore);

    const book = useAppSelector(selectSelectedBook);
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    const [isFavouriteBook, setIsFavouriteBook] = useState<boolean>(false);
    const favBooks = useAppSelector(selectFavouriteBooks);
    const priseWithoutDollar = book.price.replace('$', '');
    const favBookObj = {
        isbn13: book.isbn13,
        title: book.title,
        subtitle: book.subtitle,
        rating: book.rating,
        price: priseWithoutDollar,
        startPrice: priseWithoutDollar,
        quantity: 1,
        image: book.image,
    } 
    const toggleEditState = () => {
        setIsMenuActive(!isMenuActive);
    }
    const toggleNavigateToStartPage = () => {
        navigate('/');
    }
    const toggleEditFavBookState = () => {
        setIsFavouriteBook(!isFavouriteBook);
    }
    const addBookToLsCart = () => {
        const isbn = book.isbn13;
        addBookToCartInLS(isbn, favBookObj);
        dispatch(addBookToCartStore(favBookObj));
    }      
    useEffect(() => {
        if(id.bookid !== undefined){
            dispatch(fetchSelectedBook(id.bookid));  
        }
    }, [dispatch]);
    
    // console.log(book.isbn13);

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
            if(book.isbn13 !== ""){
                dispatch(addFavouriteBook(favBookObj));
            }
        } else {
            removeFavBookFromLS(isbn);
            dispatch(removeFavouriteBook(isbn));
        }

    }, [isFavouriteBook]);     

    console.log(favBooks);
    console.log(booksInCart); 
    
    const generateGradeContainer = (bookRating: string) => {
        const maxRating:number = 5;
        const activeStars:number = Number(bookRating);
        const notActiveStars: number = maxRating - activeStars;
        const stars = [];
        const notActiveArr = [];
  
        for (let i = 0; i < activeStars; i++) {
            stars.push(<img key={i} src={ActiveStar} alt="Active Star" />);
        }

        for (let i = 0; i < notActiveStars; i++) {
            stars.push(<img key={i + activeStars} src={NotActiveStar} alt="Inactive Star" />);
        }
        for (let i = 0; i < 5; i++) {
            notActiveArr.push(<img key={i} src={NotActiveStar} alt="Inactive Star" />);
        }

        return (
            <div className={styles.rating_container}>
                {activeStars !== 0 ? stars : notActiveArr}
            </div>
        );
    }

    return(
        <div>
            <div className={styles.content_container}>
                <div className={styles.img_container} onClick={toggleNavigateToStartPage}>
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
                            <div>{generateGradeContainer(book.rating)}</div>
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