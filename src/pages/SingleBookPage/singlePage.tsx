import { useAppSelector } from "../../redux/hooks"
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchSelectedBook } from "../../redux/products/products";
import { useParams } from "react-router-dom";
import { selectSelectedBook } from "../../redux/products/products";
import ArrowIcon from "../../utils/img/arrow_icon.png";
import styles from "./singlepage.module.scss"
import Grade from "../../utils/img/grade.png";
import { Tabs } from "../../components/Tabs/tabs";
import { ButtonAddToCart } from "../../components/ButtonAddToCart/button";


export const SinglePage = () => {
    const id = useParams();
    const dispatch = useAppDispatch();
    const book = useAppSelector(selectSelectedBook);
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

    useEffect(() => {
        if(id.bookid !== undefined){
            dispatch(fetchSelectedBook(id.bookid));  
        }
    }, [dispatch]);
    const toggleEditState = () => {
        setIsMenuActive(!isMenuActive);
    }

    return(
        <div>
            <div className={styles.content_container}>
                <div className={styles.img_container}><img src={ArrowIcon}/></div>
                <h1>{book.title}</h1>
                <div className={styles.book_desription}>
                    <div className={styles.img_background}>
                        <div className={styles.book_img}><img src={book.image}/></div>
                    </div>
                    <div className={styles.book_information}>
                        <div className={styles.grade}>
                            <h2>{book.price}</h2>
                            <div><img src={Grade}/></div>
                        </div>
                        <ul className={styles.main_menu}>
                            <li><div><p id={styles.title}>Authors</p></div><div><p id={styles.descr}>{book.authors}</p></div></li>
                            <li><div><p id={styles.title}>Publisher</p></div><div><p id={styles.descr}>{book.publisher}</p></div></li>
                            <li><div><p id={styles.title}>Language</p></div><div><p id={styles.descr}>{book.language}</p></div></li>
                            <li><div><p id={styles.title}>Formar</p></div><div><p id={styles.descr}>Paper book / ebook (PDF)</p></div></li>
                        </ul>
                        {isMenuActive 
                        ? 
                        <ul className={styles.additionally_menu}><p onClick={toggleEditState}>More detalize</p>
                            <li><div><p id={styles.title}>Pages</p></div><div><p id={styles.descr}>{book.pages}</p></div></li>
                            <li><div><p id={styles.title}>About book</p></div><div><p id={styles.descr}>{book.subtitle}</p></div></li>
                            <li><div><p id={styles.title}>Year</p></div><div><p id={styles.descr}>{book.year}</p></div></li>                       
                        </ul>
                        :
                        <ul className={styles.menu}><p id={styles.menu} onClick={toggleEditState}>More detalize</p></ul> }    
                        <ButtonAddToCart disabled={true}/>                
                    </div>
                </div>            
            </div>
            <Tabs/>
        </div>
        
    )
}