import {Books} from "../../components/Books/Books/Books";
import { Subscribe } from "../../components/Subscribe/subscribe";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFoundedBooks} from "../../redux/books/books";
import styles from "./startpage.module.scss";
import { useState, useEffect } from "react";
import { Arrows } from "../../api/types";
import { selectSearchInputValue } from "../../redux/books/books";
import { selectReleasedBooks } from "../../redux/books/books";
import { Pagination } from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import throttle from 'lodash/throttle';
import { fetchBooks } from "../../redux/books/books";
import { fetchFoundedBooks } from "../../redux/books/books";
import { selectAuthUser } from "../../redux/authentificationUser/authentificationUser";

const scrollToStart = () => {
    setTimeout(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, 500);
}

export const StartPage = () => {   
    const dispatch =  useAppDispatch();    

    const [activeNum, setActiveNum] = useState<number>(1);
    const [activeArrow, setActiveArrow] = useState<Arrows>("Next");
    const [searchParams, setSearchParams] = useSearchParams(); 

    const autUser = useAppSelector(selectAuthUser);
    const releasedBooks = useAppSelector(selectReleasedBooks);    
    const searchedBooks = useAppSelector(selectFoundedBooks);
    const searchValue = useAppSelector(selectSearchInputValue);       
    
    const handlePageChange = (newPage: number) => {
        setActiveNum(newPage);
        scrollToStart(); 
    }

    useEffect(() => {
        const currentPage = searchParams.get("page");
        if (!currentPage) {
            setSearchParams("page=1");
        }
    }, [setSearchParams, searchParams]);

    const throttleFetch = throttle((searchValue: string, actPage: string ) => {
       if (!searchValue || searchValue === "") {
            dispatch(fetchBooks());
       } else {
            dispatch(fetchFoundedBooks({ foundedParam: searchValue, pageParam: actPage }));
            setSearchParams((params) => {
                return { ...params, search: searchValue, page: actPage };
            });
        }
    }, 500);

    useEffect(() => {    
        throttleFetch(searchValue, activeNum.toString());
    }, [searchValue, activeNum]);

    return (
        <div>
            {
            searchedBooks.length === 0 && searchValue === undefined || searchValue === "" 
            ? 
            <div>
                <div className={styles.books_container}>
                    <h1 className={styles.title_text}>New Releases Books</h1>
                    <Books booksArr={releasedBooks}/>
                </div>    
            </div>             
            : 
            <div>
                <div className={styles.books_container}>
                    <h1 className={styles.title_text}>"{searchValue}" search results</h1>
                    <Books booksArr={searchedBooks}/>
                </div>
                <div className={styles.pagination_comp}>
                    <Pagination 
                    activeNum={activeNum} 
                    setActiveNum={handlePageChange} 
                    activeArrow={activeArrow} 
                    setActiveArrow={setActiveArrow}
                    />
                </div>  
            </div>
            }             
            <Subscribe/>            
        </div>
    );
}
