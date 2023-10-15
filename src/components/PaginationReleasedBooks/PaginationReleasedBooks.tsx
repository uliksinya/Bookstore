import { useNavigate } from "react-router-dom";
import styles from "./pagrelbooks.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectReleasedBooks } from "../../redux/books/books";
import { BookState } from "../../redux/books/books";
import { BookCard } from "../Books/BookCard/Bookcard";
import { useState, useEffect } from "react";
import LeftArr from "../../utils/img/arr_left.png";
import RightArr from "../../utils/img/arr_right.png";
import { throttle } from "lodash";

interface PaginationProps{
    title: string;
}
export const PaginationReleasedBooks = ({title} : PaginationProps) => {
    const navigate = useNavigate();
    const releasedBooks = useAppSelector(selectReleasedBooks);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [booksPerRow, setBooksPerRow] = useState<number>(3);

    const lastPage = Math.ceil(releasedBooks.length / booksPerRow)
    const startIndex = (currentPage - 1) * booksPerRow;
    const endIndex = Math.min(startIndex + booksPerRow, releasedBooks.length);    
    const currentBooks = booksPerRow === 1 ? releasedBooks.slice(startIndex, startIndex + 1) : releasedBooks.slice(startIndex, endIndex);

    const updateBooksPerRow = () => {
        if (document.documentElement.clientWidth <= 410){
            setBooksPerRow(1);
        } 
        else if(document.documentElement.clientWidth <= 768){
            setBooksPerRow(2); 
        } else {
            setBooksPerRow(3); 
        }
    };
    useEffect(() => {
        const throttledUpdate = throttle(updateBooksPerRow, 200);    
        throttledUpdate();     
        window.addEventListener('resize', throttledUpdate);    
            return () => {
            window.removeEventListener('resize', throttledUpdate);
            };
    }, []);     
    function nextPage(){
        if (currentPage < lastPage) {
          setCurrentPage(currentPage + 1);
        }
    };      
    function prevPage(){
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
    };   
    const redirectToPostPage = (id: number) => {
        navigate(`/books/${id}`);
    };  

    return(
        <div className={styles.popular_books}>
            <div className={styles.pagination_header}>
                <div className={styles.popular_title}>
                    <h1>{title}</h1>
                </div>
                <div className={styles.paginationButtons}>
                    <div id={styles.left_arr} onClick={prevPage}><img src={LeftArr}/></div>
                    <div id={styles.right_arr} onClick={nextPage}><img src={RightArr}/></div>
                </div>
            </div>
            <div className={styles.popular_books_container}>
                {currentBooks.map((book: BookState) => (
                    <div key={book.isbn13} className={styles.book_card}>
                        <BookCard book={book} onClick={() => redirectToPostPage(Number(book.isbn13))}/>                   
                    </div>
                ))}
            </div>
        </div>
   )
}