import styles from "./header.module.scss";
import LikeLogo from "../../utils/img/Like_icon.png";
import ShopLogo from "../../utils/img/Shop_icon.png";
import UserLogo from "../../utils/img/User_icon.png";
import React from "react";
import { fetchFoundedBooks } from "../../redux/books/books";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SearchIcon from "../../utils/img/search_icon.png";
import { selectSearchInputValue } from "../../redux/books/books";
import { setValue } from "../../redux/books/books";
import { HeaderBurgerMenu } from "../HeaderBurgerMenu/Burgermenu";
import {useState} from "react";
import throttle from 'lodash/throttle';
import {useMemo} from "react";
import ActiveLike from "../../utils/img/active_like.png";
import { selectFavouriteBooks } from "../../redux/favouritesBooks/favBooks";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(selectSearchInputValue);
    const favBooks = useAppSelector(selectFavouriteBooks);
    const navigate = useNavigate();

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setValue(value));  
    } 
    const throttlingSearchInputChange = useMemo(() => {
        return throttle(handleSearchInputChange, 500);       
    }, [handleSearchInputChange]);

    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
    const toogleMenuState = () => {
        setIsActiveMenu(!isActiveMenu);
    }
    const toggleNavigateToFavorites = () => {
        navigate('/favorites');
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
                        <img src={favBooks.length === 0 ? LikeLogo : ActiveLike} alt="Like Icon" />
                    </div>
                    <img src={ShopLogo} alt="Shop Icon" />
                    <img src={UserLogo} alt="User Icon" />
                </div>
                <div className={styles.media_header_icons_container}>
                    <img src={ShopLogo} alt="Shop Icon" />
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
