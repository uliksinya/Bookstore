import styles from "./header.module.scss";
import LikeLogo from "../../utils/img/Like_icon.png";
import CartLogo from "../../utils/img/Shop_icon.png";
import ActiveCartLogo from "../../utils/img/active_cart_icon.png";
import UserLogo from "../../utils/img/User_icon.png";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SearchIcon from "../../utils/img/search_icon.png";
import { selectSearchInputValue } from "../../redux/books/books";
import { setValue } from "../../redux/books/books";
import { HeaderBurgerMenu } from "../HeaderBurgerMenu/Burgermenu";
import {useState} from "react";
import throttle from 'lodash/throttle';
import {useMemo, useEffect} from "react";
import ActiveLike from "../../utils/img/active_like.png";
import { useNavigate } from "react-router-dom";
import {getBooksFromLS} from "../../hooks/localStorage/favBooksLS";
import { isAutentificationUserInLS } from "../../hooks/localStorage/SignInUpLS";
import { getBooksFromCartInLS } from "../../hooks/localStorage/booksInCartLS";

export const Header = () => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(selectSearchInputValue);
    const navigate = useNavigate();
    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
    const [favBooks, setFavBooks] = useState([]);
    const [booksInCart, setBooksInCart] = useState([]);
    useEffect(() => {
        const books = getBooksFromLS();
        setFavBooks(books);        
    }, []);

    useEffect(() => {
        const booksInCart = getBooksFromCartInLS();
        setBooksInCart(booksInCart);        
    }, []);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setValue(value));  
    } 
    const throttlingSearchInputChange = useMemo(() => {
        return throttle(handleSearchInputChange, 500);       
    }, [handleSearchInputChange]);

    const toogleMenuState = () => {
        setIsActiveMenu(!isActiveMenu);
    }
    const toggleNavigateToFavorites = () => {
        navigate('/favorites');
    }
    const toggleNavigateToCart = () => {
        navigate('/cart');
    }
    const toggleNavigateToAccount = () => {
        isAutentificationUserInLS() ? navigate('/account') : navigate('/signin');
    }
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <h2 id={styles.logo_text}>
                        Bookstore
                    </h2>
                </div>
                <div className={styles.input_container}>
                    <input onChange={throttlingSearchInputChange} value={inputValue} placeholder="Search..." type='text' disabled={false}/>
                    <img src={SearchIcon} className={styles.search_icon}/>
                </div>          
                <div className={styles.header_icons_container}>
                    <div className={styles.like_cont} onClick={() => toggleNavigateToFavorites()}>
                        <img src={favBooks.length === 0 ? LikeLogo : ActiveLike} alt="Like Icon"/>
                    </div>
                    <div onClick={() => toggleNavigateToCart()}>
                        <img src={booksInCart.length !== 0 ? ActiveCartLogo : CartLogo} alt="Cart Icon" />
                    </div>
                    <div onClick={() => toggleNavigateToAccount()} className={styles.user_icon}>
                        <img src={UserLogo} alt="User Icon" />
                    </div>
                </div>
                <div className={styles.media_header_icons_container}>
                    <div className={styles.cart_icon}>
                        <img src={CartLogo} alt="Cart Icon" />
                    </div>
                    <HeaderBurgerMenu onClick={toogleMenuState}/>
                </div>            
            </div>
            {isActiveMenu && 
                <div className={styles.menu_input_container}>
                    <input onChange={throttlingSearchInputChange} value={inputValue} placeholder="Search..." type='text' disabled={false}/>
                    <img src={SearchIcon} className={styles.search_icon}/>
                </div> 
            }
      </div>
    )
}
