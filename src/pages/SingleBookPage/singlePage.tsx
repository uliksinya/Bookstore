import { useAppSelector } from "../../redux/hooks"
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchSelectedBook } from "../../redux/books/books";
import { useNavigate, useParams } from "react-router-dom";
import { selectSelectedBook } from "../../redux/books/books";
import ArrowIcon from "../../assets/img/arrow_icon.png";
import styles from "./singlepage.module.scss"
import { Button } from "../../components/Button/Button";
import FacebookIcon from "../../assets/img/facebook_icon.png";
import TwitterIcon from "../../assets/img/twitter_icon.png";
import MenuIcon from "../../assets/img/horiz_menu_icon.png";
import { Subscribe } from "../../components/Subscribe/Subscribe";
import {ButtonFavourite} from "../../components/ButtonFavorite/Buttonfavourite";
import { addFavBookToLS, removeFavBookFromLS , isThisBookInFavLS } from "../../utils/localStorage/favBooksLS";
import { addBookToCartInLS } from "../../utils/localStorage/booksInCartLS";
import { addFavouriteBook, removeFavouriteBook } from "../../redux/favouritesBooks/favBooks";
import { addBookToCartStore } from "../../redux/cart/booksincart";
import arrUp from "../../assets/img/arr_up.png";
import arrDown from '../../assets/img/arr_down.png';
import { BookDescriptionTabs } from "../../components/BookDescriptionTabs/BookDescriptionTabs";
import { BooksDescrType } from "../../types/types";
import { PaginationReleasedBooks } from "../../components/PaginationReleasedBooks/PaginationReleasedBooks";
import { scrollToTop } from "../../utils/utilsFunctions/utilsFunctions";
import { GradeContainer } from "../../components/GradeContainer/GradeContainer";
  
export const SinglePage = () => {
    const id = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const book = useAppSelector(selectSelectedBook);    
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    const [isFavouriteBook, setIsFavouriteBook] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<BooksDescrType>('Description');
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
        scrollToTop();
    }, []);

    useEffect(() => {
        if(id.bookid !== undefined){
            dispatch(fetchSelectedBook(id.bookid));  
        }
    }, [dispatch]);

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
                            <GradeContainer bookRating={book.rating}/>
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
                        <ul className={styles.additionally_menu}>
                            <div className={styles.more_detalise} onClick={toggleEditState}>
                                <p>More detalize</p>
                                <img src={arrUp} id={styles.arr}/>
                            </div>
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
                        <ul className={styles.menu}>
                            <div className={styles.more_detalise} onClick={toggleEditState}>
                                <p>More detalize</p>
                                <img src={arrDown} id={styles.arr}/>
                            </div>
                        </ul> }    
                        <Button disabled={false} content={"Add to cart"} btnStyle={"dark"} onClick={() => addBookToLsCart()}/> 
                        <div className={styles.prewiew_container}><p id={styles.preview}>Prewiew book</p></div>               
                    </div>
                </div>            
            </div>
            <BookDescriptionTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className={styles.book_description}>
                {activeTab === 'Description' && 
                    <span id={styles.single_desc}>{book.desc}</span>
                }

                {activeTab === 'Authors' &&
                    <span id={styles.single_desc}>{book.authors}</span>
                }

                {activeTab === 'Rewiews' &&
                    <span id={styles.single_desc}>Rewiews</span>
                }
            </div>
            <div className={styles.icons_container}>
                <div><img src={FacebookIcon}/></div>
                <div><img src={TwitterIcon}/></div>
                <div><img src={MenuIcon}/></div>                
            </div>
            <Subscribe/>
            <div>
                <PaginationReleasedBooks title={'Similar Books'} />
            </div>
        </div>        
    )
}