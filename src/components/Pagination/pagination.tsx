import styles from "./pagination.module.scss";
import prevArrow from "../../utils/img/left_arrow.png";
import nextArrow from "../../utils/img/right_arrow.png";
import { Arrows } from "../api/types";

interface PaginationProps{
    activeNum: number;
    setActiveNum: (num: number) => void;
    activeArrow: Arrows; 
    setActiveArrow: (str: Arrows) => void;
}
export const Pagination = ({activeNum, setActiveNum, activeArrow, setActiveArrow}: PaginationProps) => {

    const handleClick = (num: number) => {
        setActiveNum(num);
    }
    
    const handleNextArrowClick = () => {
        if (activeArrow === "Prev") {
            setActiveArrow("Next");            
        }else if(activeNum !== 6){
            setActiveNum(activeNum + 1); 
        }
    }

    const handlePrevArrowClick = () => {
        if (activeArrow === "Next") {
            setActiveArrow("Prev");
        }else if(activeNum !== 1){
            setActiveNum(activeNum - 1); 
        }
    }  

    return (
        <div className={styles.pagination_container}>
            <div className={styles.prev_container} onClick={handlePrevArrowClick}>
                <div><img src={prevArrow}/></div>
                <div><p className={activeArrow === "Prev" ? styles.active_arrow : styles.def_arrow}>Prev</p></div>
            </div>
            <div className={styles.numeration}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} onClick={() => handleClick(num)}>
                        <p className={num === activeNum ? styles.active_num : styles.def_num}>{num}</p>
                    </div>
                ))}
            </div>
            <div className={styles.next_container} onClick={handleNextArrowClick}>
                <div><img src={nextArrow}/></div>
                <div><p className={activeArrow === "Next" ? styles.active_arrow : styles.def_arrow}>Next</p></div>
            </div>
        </div>
    )
}
