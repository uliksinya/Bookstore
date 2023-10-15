import styles from "./cartbookcard.module.scss";
import { useState, useEffect } from 'react';
import { updatePriceInLS } from '../../../utils/localStorage/booksInCartLS';
import { parsePriceToNumber} from '../../../utils/utilsFunctions/utilsFunctions';
import { updateQuantityInLS } from '../../../utils/localStorage/booksInCartLS';
import DarkCross from '../../../assets/img/cross_dark.png';
import Plus from "../../../assets/img/plus_icon.png";
import Minus from "../../../assets/img/minus_icon.png";
import Cross from "../../../assets/img/cross_ic.png";
import { CartBookCardProps } from "../../../types/types";

const CartBookCard = ({ singleBook, updateBookInCart, removeBook } :  CartBookCardProps) => {
  const startPrice = parsePriceToNumber(singleBook.startPrice);
  const price = parsePriceToNumber(singleBook.price);
  const [countNumber, setCountNumber] = useState<number>(singleBook.quantity);
  const [bookPrice, setBookPrice] = useState<number>(price);  

  const togglePlus = () => {    
    const newCount = countNumber + 1;
    setCountNumber(newCount);
    setBookPrice(newCount * startPrice); 
    updateBookInCart(singleBook.isbn13, countNumber + 1, startPrice + bookPrice); 
  }
  const toggleMinus = () => {
    if (countNumber > 1) {
      const newCount = countNumber - 1;
      setCountNumber(newCount);
      setBookPrice(newCount * startPrice);
      updateBookInCart(singleBook.isbn13, countNumber - 1, bookPrice - startPrice); 
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
                <img src={DarkCross} id={styles.dark_cross} onClick={() => removeBook(singleBook.isbn13)}/>                     
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
                <h3>{'$' + bookPrice.toFixed(2)}</h3>
            </div> 
            <div id={styles.cross_img} onClick={() => removeBook(singleBook.isbn13)}>
                <img src={Cross}/>
            </div>
        </div>
        <div className={styles.book_line}></div>           
    </div>
  );
}

export default CartBookCard;