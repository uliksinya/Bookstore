import styles from "./header.module.scss";
import LikeLogo from "../../utils/img/Like_icon.png";
import CartLogo from "../../utils/img/Shop_icon.png";
import ActiveCartLogo from "../../utils/img/active_cart_icon.png";
import UserLogo from "../../utils/img/User_icon.png";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import SearchIcon from "../../utils/img/search_icon.png";
import { selectSearchInputValue } from "../../redux/books/books";
import { setValue } from "../../redux/books/books";
import { HeaderBurgerMenu } from "../HeaderBurgerMenu/Burgermenu";
import {useState} from "react";
import throttle from 'lodash/throttle';
import { useMemo, useEffect } from "react";
import ActiveLike from "../../utils/img/active_like.png";
import { selectFavouriteBooks } from "../../redux/favouritesBooks/favBooks";
import { selectBooksInCartStore } from "../../redux/cart/booksincart";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import CrossPopUp from "../../utils/img/cross_pop_up.png";
import { selectAuthUser } from "../../redux/authentificationUser/authentificationUser";
import { Button } from "../Button/Button";
import { clearUser } from "../../redux/authentificationUser/authentificationUser";
import { removeAuthentificationUserFromLS } from "../../hooks/localStorage/signInUpLS";
import { getBooksFromLS } from "../../hooks/localStorage/favBooksLS";
import { favBookType } from "../../api/types";
import { addFavouriteBook } from "../../redux/favouritesBooks/favBooks";
import { setUser } from "../../redux/authentificationUser/authentificationUser";
import { getAuthentificationUserFromLS } from "../../hooks/localStorage/signInUpLS";
import { getBooksFromCartInLS } from "../../hooks/localStorage/booksInCartLS";
import { addBookToCartStore } from "../../redux/cart/booksincart";

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); 
    const authUser = useAppSelector(selectAuthUser);
    const inputValue = useAppSelector(selectSearchInputValue);
    const favBooksFromStore = useAppSelector(selectFavouriteBooks);
    const booksInCart = useAppSelector(selectBooksInCartStore); 

    const favBooksFromLS : favBookType[] = getBooksFromLS();
    const booksInCartFromLS: favBookType[] = getBooksFromCartInLS();

    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);

    useEffect(() => {        
        favBooksFromLS.forEach((book: favBookType) => {
            dispatch(addFavouriteBook(book));
        }); 

        dispatch(setUser(getAuthentificationUserFromLS()));

        booksInCartFromLS.forEach(book => {
            dispatch(addBookToCartStore(book));
        });
        
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
    const toggleLogOut = () => {
        removeAuthentificationUserFromLS();
        dispatch(clearUser());
    }

    const toggleNavigateToStartPage = () => {
        navigate('/');
    }    
    const toggleNavigateToFavorites = () => {
        navigate('/books/favorites');
    }
    const toggleNavigateToCart = () => {
        navigate('/books/cart');
    }
    const toggleNavigateToAccount = () => {
        authUser.user !== null ? navigate('/books/account') : navigate('/signin');
    }
    const toggleNavigateToSignIn = () => {
        navigate('/signin');
    }

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.logo} onClick={() => toggleNavigateToStartPage()}>
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
                        <img id={styles.heart_img} src={favBooksFromStore.length === 0 ? LikeLogo : ActiveLike} alt="Like Icon"/>
                    </div>
                    <div onClick={() => toggleNavigateToCart()}>
                        <img id={styles.cart_img} src={booksInCart.length !== 0 ? ActiveCartLogo : CartLogo} alt="Cart Icon" />
                    </div>
                    <div onClick={() => toggleNavigateToAccount()} className={styles.user_icon}>
                        <img id={styles.user_img} src={UserLogo} alt="User Icon" />
                    </div>
                </div>
                <div className={styles.media_header_icons_container}>
                    <div className={styles.cart_icon} onClick={() => toggleNavigateToCart()}>
                        <img id={styles.cart_img} src={booksInCart.length !== 0 ? ActiveCartLogo : CartLogo} alt="Cart Icon" />
                    </div>
                    <HeaderBurgerMenu onClick={toogleMenuState}/>
                </div>            
            </div>
            {isActiveMenu && 
                <div>
                    <div className={styles.pop_up_menu}>
                        <div className={styles.logo_tel} onClick={() => toggleNavigateToStartPage()}>
                            <h2 id={styles.logo_text}>
                                Bookstore
                            </h2>
                        </div>
                        <div onClick={() => toggleNavigateToCart()} className={styles.cart_tel}>
                            <img id={styles.cart_img} src={booksInCart.length !== 0 ? ActiveCartLogo : CartLogo} alt="Cart Icon" />
                        </div>
                        <div className={styles.cross_icon} onClick={toogleMenuState}>
                            <img src={CrossPopUp}/>
                        </div>
                        <div className={styles.menu_content}>
                            <div className={styles.line}></div>
                            <div className={styles.pop_up_menu_input}>
                            <div className={styles.pop_up_input_container}>
                                <input onChange={throttlingSearchInputChange} value={inputValue} placeholder="Search..." type='text' disabled={false}/>
                                <img src={SearchIcon} className={styles.search_icon}/>
                            </div>                             
                            {
                                authUser.user !== null 
                                ?
                                <div className={styles.menu_container}>
                                    <div id={styles.fav_item} onClick={toggleNavigateToFavorites}>
                                        <h1>Favorites</h1>
                                    </div>
                                    <div id={styles.cart_item} onClick={toggleNavigateToCart}>
                                        <h1>Cart</h1>
                                    </div>
                                    <div className={styles.btn_log_out}>
                                        <Button disabled={false} content={'Log out'} btnStyle={'dark'} onClick={toggleLogOut}/>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className={styles.btn_sign_in}>
                                        <Button disabled={false} content={'Sign In'} btnStyle={'dark'} onClick={toggleNavigateToSignIn}/>                            
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                    </div>                    
                    <div className={styles.overlay}></div>
                </div>
            }
      </div>
    )
}
