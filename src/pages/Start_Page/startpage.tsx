import { ReleasedBooks } from "../../components/Books/ReleasedBooks/releasedbooks";
import { Subscribe } from "../../components/Subscribe/subscribe";
import { useAppSelector } from "../../redux/hooks";
import { selectFoundedBooks} from "../../redux/books/books";
import { SearchedBooks } from "../../components/Books/SearchedBooks/searchedbooks";
import styles from "./startpage.module.scss";
import { Pagination } from "../../components/Pagination/pagination";
import { useState } from "react";
import { Arrows } from "../../components/api/types";
import { selectSearchInputValue } from "../../redux/searchValue/searchValue";


export const StartPage = () => {
    const searchedBooks = useAppSelector(selectFoundedBooks);     
    const [activeNum, setActiveNum] = useState<number>(1);
    const [activeArrow, setActiveArrow] = useState<Arrows>("Next");
    const searchValue = useAppSelector(selectSearchInputValue);

    return (
        <div>
            {searchedBooks.length === 0 && searchValue === undefined || searchValue === "" 
            ? 
            <div className={styles.books_container}>
                <h1 className={styles.title_text}>New Releases Books</h1>
                <ReleasedBooks activeNum={activeNum}/>
            </div>           
            : 
            <div className={styles.books_container}>
                <h1 className={styles.title_text}>"{searchValue}" search results</h1>
                <SearchedBooks activeNum={activeNum}/>
            </div>
            } 
            <div className={styles.pagination_comp}>
                <Pagination activeNum={activeNum} setActiveNum={setActiveNum} activeArrow={activeArrow} setActiveArrow={setActiveArrow}/>
            </div>         
            <Subscribe/>            
        </div>
    );
};
