import React, { useState, useEffect } from 'react';
import styles from "./bookcart.module.scss";
import { favBookType } from '../../api/types';
import Plus from "../../utils/img/plus_icon.png";
import Minus from "../../utils/img/minus_icon.png";
import Cross from "../../utils/img/little_cross.png";
import { replace } from 'lodash';
import { updatePriceInLS } from '../../hooks/localStorage/booksInCartLS';
import { parsePriceToNumber } from '../../redux/hooks';
import { updateQuantityInLS } from '../../hooks/localStorage/booksInCartLS';

interface CartBookCardProps {
    singleBook: favBookType;
}

const CartBookCard = ({ singleBook } :  CartBookCardProps) => {
  const [countNumber, setCountNumber] = useState(singleBook.quantity);
  const startPrice = parsePriceToNumber(singleBook.price)
  const [bookPrice, setBookPrice] = useState(startPrice);

  const togglePlus = () => {    
    const newCount = countNumber + 1;
    setCountNumber(newCount);
    setBookPrice(parseFloat((newCount * startPrice).toFixed(2)));  
  }
  
  const toggleMinus = () => {
    if (countNumber > 1) {
      const newCount = countNumber - 1;
      setCountNumber(newCount);
      setBookPrice(parseFloat((newCount * startPrice).toFixed(2)));
    }
  }
  
  useEffect(() => {
    updateQuantityInLS(singleBook.isbn13, countNumber);
    updatePriceInLS(singleBook.isbn13, bookPrice.toString());        
  },[bookPrice, countNumber]);
    
  return (
    <div key={singleBook.isbn13} className={styles.fav_books_line}>
        <div className={styles.book_card}>
            <div className={styles.background}>
                <img src={singleBook.image} className={styles.book_img}/>                       
            </div>  
            <div className={styles.text_container}>
                <h3 id={styles.bookcard_title}>
                    {singleBook.title}
                </h3>
                <div className={styles.author_data}>
                    <p>{singleBook.subtitle}</p>                    
                </div>  
                <div className={styles.quantity_container}>
                    <button className={styles.button_container} type="button" name="button" onClick={toggleMinus}>
                        <img src={Minus} alt="" />
                    </button>
                    <div className={styles.count_container}><p>{countNumber}</p></div>
                    <button className={styles.button_container} type="button" name="button" onClick={togglePlus}>
                        <img src={Plus} alt="" />
                    </button>
                </div>                              
            </div> 
            <div className={styles.price_grade}>
                <h3>{'$' + bookPrice}</h3>
            </div> 
            <div id={styles.cross_img}>
                <img src={Cross}/>
            </div>
        </div>
        <div className={styles.book_line}></div>           
    </div>
  );
}

export default CartBookCard;
