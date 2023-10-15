import styles from "./pagination.module.scss";
import prevArrow from "../../assets/img/left_arrow.png";
import nextArrow from "../../assets/img/right_arrow.png";
import { useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks.ts";
import { selectTotalSearchedBooks } from "../../redux/books/books.ts";
import { PaginationProps } from "../../types/types.ts";
import { generateNumbersArrByLimit } from "../../utils/utilsFunctions/utilsFunctions.ts";
   
export const Pagination = ({activeNum, activeArrow, setActiveNum, setActiveArrow}: PaginationProps) => {

    const totalSearchBooks = useAppSelector(selectTotalSearchedBooks);
    const allPages = (Number(totalSearchBooks));
    const [searchParams, setSearchParams] = useSearchParams();  

    const generatedPagesArray = useMemo( 
        () => generateNumbersArrByLimit(allPages, Number(activeNum)), [allPages, activeNum]
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
                    {generatedPagesArray.map((num, index) => {
                        if(num === 0) return <p key={index}>...</p>
                            return (
                                <div key={index} onClick={() => handleClick(num)}>
                                    <p className={num === activeNum ? styles.active_num : styles.def_num}>{num}</p>
                                </div>
                            );
                    })}
                </div>
                <div className={styles.next_container} onClick={handleNextArrowClick}>
                    <div><img src={nextArrow}/></div>
                    <div id={styles.arr_text}><p className={activeArrow === "Next" ? styles.active_arrow : styles.def_arrow}>Next</p></div>
                </div>
            </div>
    )
}
