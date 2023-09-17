import { ReleasedBooks } from "../../components/Books/ReleasedBooks/releasedbooks";
import { Subscribe } from "../../components/Subscribe/subscribe";
import { useAppSelector } from "../../redux/hooks";
import { selectFoundedBooks} from "../../redux/products/products";
import { SearchedBooks } from "../../components/Books/SearchedBooks/searchedbooks";
import styles from "./startpage.module.scss";

export const StartPage = () => {
    const searchedBooks = useAppSelector(selectFoundedBooks); 

    return (
        <div>
            {/* если есть value и =0 то пустой див если есть велью и не
              0 то серч если нету велью то релизд */}
            {searchedBooks.length !==0  ? 
            <div>
                <h1 className={styles.title_text}>"" search results</h1>
                <SearchedBooks/>
            </div>
            : 
            <div>
                <h1 className={styles.title_text}>New Releases Books</h1>
                <ReleasedBooks/>
            </div>
            }           
            <Subscribe/>
        </div>
    );
};
