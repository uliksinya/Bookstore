import styles from "./header.module.scss"
import LikeLogo from "../../utils/img/Like_icon.png";
import ShopLogo from "../../utils/img/Shop_icon.png";
import UserLogo from "../../utils/img/User_icon.png";
import { useState } from "react";
import React from "react";
import { fetchFoundedBooks } from "../../redux/products/products";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectFoundedBooks } from "../../redux/products/products";
import SearchIcon from "../../utils/img/search_icon.png";

export const Header = () => {
    const dispatch = useAppDispatch();
    const searchedBooks = useAppSelector(selectFoundedBooks);
    console.log(searchedBooks);
    const [value, setValue] = useState<string>("");

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        dispatch(fetchFoundedBooks(newValue));     
    } 
    return (
        <div className={styles.header}>
            <div className={styles.logo}><h2 id={styles.logo_text}>Bookstore</h2></div>
            <div className={styles.input_container}>
                <input onChange={handleSearchInputChange} value={value} placeholder="Search..." type='text' disabled={false}/>
                <img src={SearchIcon} className={styles.search_icon}/>
            </div>
            {/* <CustomInput onChange={handleSearchInputChange} value={value} placeholder="Search..." inputType='text' disabled={false} isValid={true} isSearchInput={true} errorText='Error text...' width="28.23vw" /> */}
            <div className={styles.header_icons_container}>
                <img src={LikeLogo} alt="Like Icon" />
                <img src={ShopLogo} alt="Shop Icon" />
                <img src={UserLogo} alt="User Icon" />
            </div>
        </div>
    )
}
