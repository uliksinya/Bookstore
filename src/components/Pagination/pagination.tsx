import styles from "./pagination.module.scss";
import prevArrow from "../../utils/img/left_arrow.png";
import nextArrow from "../../utils/img/right_arrow.png";
import { Arrows } from "../../api/types.ts";
import { useAppDispatch} from "../../redux/hooks.ts";
import { setPagesArray } from '../../redux/pagination/pagination.ts';
import { useEffect, useMemo } from 'react';
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
function generateNumbersArrByLimit(limit: number, currentPageNumber: number){
    const numbersArray: number[] = [];
        for (let i = 1; i <= limit; i++) {            
            numbersArray.push(i);
        }
        if(limit <= 7) return numbersArray;

        const startControlPoint = 4;
        const endControlPoint = limit - 4;

        if(currentPageNumber >= startControlPoint && currentPageNumber <= endControlPoint){
            const newArray: number[] = [1, 0];
            const resultArray: number[] = newArray.concat(numbersArray.slice(currentPageNumber - 2, currentPageNumber + 1));
            return resultArray.concat([0, limit]);
        }else if(currentPageNumber < startControlPoint) {
            const newArray: number[] = numbersArray.slice(0, startControlPoint);
            return newArray.concat([0, limit]);
        }else{
            return [1,0].concat(numbersArray.slice(endControlPoint-2, limit));
        }
};
   
export const Pagination = ({activeNum, activeArrow, setActiveNum, setActiveArrow, totalReleasedBooks}: PaginationProps) => {

    const totalSearchBooks = useAppSelector(selectTotalSearchedBooks);
    const allPages = (Number(totalSearchBooks));
    const [searchParams, setSearchParams] = useSearchParams();  

    const generatedPagesArray = useMemo( 
        () => generateNumbersArrByLimit(allPages, Number(activeNum)), 
        [allPages, activeNum]
    );

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
        }else if(activeNum <= allPages){
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

    return (
            <div className={styles.pagination_container}>
                <div className={styles.prev_container} onClick={handlePrevArrowClick}>
                    <div><img src={prevArrow}/></div>
                    <div id={styles.arr_text}><p className={activeArrow === "Prev" ? styles.active_arrow : styles.def_arrow}>Prev</p></div>
                </div>
                <div className={styles.numeration}>
                    {generatedPagesArray.map((num) => {
                        if(num === 0) return <p>...</p>
                            return <div key={num} onClick={() => handleClick(num)}>
                                <p className={num === activeNum ? styles.active_num : styles.def_num}>{num}</p>
                            </div>
                        })
                    }
                </div>
                <div className={styles.next_container} onClick={handleNextArrowClick}>
                    <div><img src={nextArrow}/></div>
                    <div id={styles.arr_text}><p className={activeArrow === "Next" ? styles.active_arrow : styles.def_arrow}>Next</p></div>
                </div>
            </div>
    )
}
