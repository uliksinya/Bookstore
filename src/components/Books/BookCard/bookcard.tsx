import styles from "./bookcard.module.scss";
import Grade from "../../../utils/img/grade.png";
import { IBookCard } from "../../../api/types";
import {useMemo} from 'react';

const palette = ['purple', 'orange', 'green', 'blue'];

function getRandomNum(max: number){
    return Math.floor(Math.random() * max);
}

export const BookCard = ({ book, onClick } : IBookCard) => {
    const randomColor = useMemo(() => palette[getRandomNum(4)], []);   
    return (
        <div className={styles.bookcard_container} onClick={onClick}>
            <div className={styles.background} id={styles[randomColor]}>
                <img src={book.image} id={styles.book_image}/>
                <h3 id={styles.bookcard_title}>
                    {book.title}
                </h3>
                <div className={styles.author_data}>
                    <p>{book.subtitle}</p>                    
                </div>  
                <div className={styles.bookcard_footer}>
                    <h3>{book.price}</h3>
                    <div>
                        <img src={Grade}/>
                    </div>
                </div>             
            </div>
        </div>
    )
}