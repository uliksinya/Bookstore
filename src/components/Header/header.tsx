import styles from "./header.module.scss";
import LikeLogo from "../../utils/img/Like_icon.png";
import ShopLogo from "../../utils/img/Shop_icon.png";
import UserLogo from "../../utils/img/User_icon.png";
import React from "react";
import { fetchFoundedBooks } from "../../redux/books/books";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SearchIcon from "../../utils/img/search_icon.png";
import { selectSearchInputValue } from "../../redux/searchValue/searchValue";
import { setValue } from "../../redux/searchValue/searchValue";

export const Header = () => {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectSearchInputValue);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setValue(value));
        dispatch(fetchFoundedBooks(value));

        console.log(typeof(value));
    } 
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <h2 id={styles.logo_text}>
                    Bookstore
                </h2>
            </div>
            <div className={styles.input_container}>
                <input onChange={handleSearchInputChange} value={value} placeholder="Search..." type='text' disabled={false}/>
                <img src={SearchIcon} className={styles.search_icon}/>
            </div>
            <div className={styles.header_icons_container}>
                <img src={LikeLogo} alt="Like Icon" />
                <img src={ShopLogo} alt="Shop Icon" />
                <img src={UserLogo} alt="User Icon" />
            </div>
        </div>
    )
}
