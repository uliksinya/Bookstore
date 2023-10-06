import styles from "./pagination.module.scss";
import prevArrow from "../../utils/img/left_arrow.png";
import nextArrow from "../../utils/img/right_arrow.png";
import { Arrows } from "../../api/types.ts";
import { useAppDispatch} from "../../redux/hooks.ts";
import { setPagesArray } from '../../redux/pagination/pagination.ts';
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks.ts";
import { selectPagesArray } from "../../redux/pagination/pagination.ts";
import { BookState } from "../../redux/books/books.ts";
import { selectTotalSearchedBooks } from "../../redux/books/books.ts";

interface PaginationProps{
    activeNum: number;    
    activeArrow: Arrows; 
    setActiveNum: (num: number) => void;
    setActiveArrow: (str: Arrows) => void;
    totalReleasedBooks: string;
}  
export const createPaginationRelBooksObject = (booksArr: BookState[] ) => {
    console.log(booksArr);
    const booksAtOnePage = 6;       
    const paginatedBooks: { [key: string]: BookState[] } = {};
    for (let i = 0; i < booksArr.length; i += booksAtOnePage) {
        const currentPage = Math.floor(i / booksAtOnePage) + 1;
        const startIndex = i;
        const endIndex = i + booksAtOnePage;
        paginatedBooks[currentPage.toString()] = booksArr.slice(startIndex, endIndex);
    }
    console.log(paginatedBooks);
    return paginatedBooks
};


export const Pagination = ({activeNum, activeArrow, setActiveNum, setActiveArrow, totalReleasedBooks}: PaginationProps) => {
    const totalSearchBooks = useAppSelector(selectTotalSearchedBooks);
    console.log(totalSearchBooks);
    const dispatch = useAppDispatch();
    const allPagesArr = useAppSelector(selectPagesArray);
    const [searchParams, setSearchParams] = useSearchParams();  

    const handleClick = (num: number) => {
        setActiveNum(num);
        setSearchParams((prevState) => {
            prevState.set("page", num.toString());
            return prevState;
        });
    }   
    
    const handleNextArrowClick = () => {
        if (activeArrow === "Prev") {
            setActiveArrow("Next");            
        }else if(activeNum !== allPagesArr.length){
            setActiveNum(activeNum + 1);
        }
    }

    const handlePrevArrowClick = () => {
        if (activeArrow === "Next") {
            setActiveArrow("Prev");
        } else if(activeNum !== 1){
            setActiveNum(activeNum - 1); 
        }
    }  

    // const releasedBooksPages = (allBooksQuantity: number) => {
    //     const booksOnPageQuantity = 6;
    //     if(allBooksQuantity % booksOnPageQuantity !== 0){
    //         return Math.floor(allBooksQuantity / booksOnPageQuantity) + 1;
    //     } else{
    //         return Math.floor(allBooksQuantity / booksOnPageQuantity);
    //     }
    // }

    // const createPagesArr = () =>{
    //     const allPages = releasedBooksPages(Number(totalReleasedBooks));
    //     let pagesArr = [];
    //     for (let i = 1; i <= allPages; i++) {            
    //         pagesArr.push(i);
    //     }
    //     return pagesArr;
    // }
    const allPages = (Number(totalSearchBooks));
    const createPagesArr = () =>{
        
        let pagesArr = [];
        for (let i = 1; i <= allPages; i++) {            
            pagesArr.push(i);
        }
        return pagesArr;
    }    

    const pagesArray = createPagesArr();    
    // useEffect(() => {        
    //     dispatch(setPagesArray(pagesArray));          
    // }, []); 
    // Пусть maxPagesToShow - это максимальное количество страниц, которые вы хотите отображать перед и после многоточия.



    return (
        // <div className={styles.pagination_container}>
        //     <div className={styles.prev_container} onClick={handlePrevArrowClick}>
        //         <div><img src={prevArrow}/></div>
        //         <div id={styles.arr_text}><p className={activeArrow === "Prev" ? styles.active_arrow : styles.def_arrow}>Prev</p></div>
        //     </div>
        //     <div className={styles.numeration}>
        //         {pagesArray.map((num) => (
        //             <div key={num} onClick={() => handleClick(num)}>
        //                 <p className={num === activeNum ? styles.active_num : styles.def_num}>{num}</p>
        //             </div>
        //         ))}
        //     </div>
        //     <div className={styles.next_container} onClick={handleNextArrowClick}>
        //         <div><img src={nextArrow}/></div>
        //         <div id={styles.arr_text}><p className={activeArrow === "Next" ? styles.active_arrow : styles.def_arrow}>Next</p></div>
        //     </div>
        // </div>
            <div className={styles.pagination_container}>
                <div className={styles.prev_container} onClick={handlePrevArrowClick}>
                    <div><img src={prevArrow}/></div>
                    <div id={styles.arr_text}><p className={activeArrow === "Prev" ? styles.active_arrow : styles.def_arrow}>Prev</p></div>
                </div>
                <div className={styles.numeration}>
                    {pagesArray.map((num) => (
                        <div key={num} onClick={() => handleClick(num)}>
                            <p className={num === activeNum ? styles.active_num : styles.def_num}>{num}</p>
                        </div>
                    ))}
                    {/* {showEllipsis && <p className={styles.ellipsis}>...</p>} */}
                    {allPages !== activeNum && (
                        <div key={allPages} onClick={() => handleClick(allPages)}>
                            <p className={allPages === activeNum ? styles.active_num : styles.def_num}>{allPages}</p>
                        </div>
                    )}
                </div>
                <div className={styles.next_container} onClick={handleNextArrowClick}>
                    <div><img src={nextArrow}/></div>
                    <div id={styles.arr_text}><p className={activeArrow === "Next" ? styles.active_arrow : styles.def_arrow}>Next</p></div>
                </div>
            </div>
    )
}
