import { ReleasedBooks } from "../../components/Books/ReleasedBooks/releasedbooks";
import { Subscribe } from "../../components/Subscribe/subscribe";
import { useAppSelector } from "../../redux/hooks";
import { selectFoundedBooks} from "../../redux/products/products";
import { SearchedBooks } from "../../components/Books/SearchedBooks/searchedbooks";
import styles from "./startpage.module.scss";
import { Pagination } from "../../components/Pagination/pagination";
import { useState } from "react";
import { Arrows } from "../../components/api/types";


export const StartPage = () => {
    const searchedBooks = useAppSelector(selectFoundedBooks);     
    const [activeNum, setActiveNum] = useState<number>(1);
    const [activeArrow, setActiveArrow] = useState<Arrows>("Next");

    return (
        <div>
            {/* если есть value и =0 то пустой див если есть велью и не
              0 то серч если нету велью то релизд */}
            {searchedBooks.length !==0  ? 
            <div className={styles.books_container}>
                <h1 className={styles.title_text}>"" search results</h1>
                <SearchedBooks/>
            </div>
            : 
            <div className={styles.books_container}>
                <h1 className={styles.title_text}>New Releases Books</h1>
                <ReleasedBooks activeNum={activeNum}/>
            </div>
            } 
            <div className={styles.pagination_comp}>
                <Pagination activeNum={activeNum} setActiveNum={setActiveNum} activeArrow={activeArrow} setActiveArrow={setActiveArrow}/>
            </div>         
            <Subscribe/>            
        </div>
    );
};
