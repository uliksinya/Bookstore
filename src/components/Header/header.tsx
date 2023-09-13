import styles from "./header.module.scss"
import Logo from "../../utils/img/bookstore_logo.png"
import LikeLogo from "../../utils/img/Like_icon.png";
import ShopLogo from "../../utils/img/Shop_icon.png";
import UserLogo from "../../utils/img/User_icon.png";
import { CustomInput } from "../CustomInput/input";
import { useState } from "react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchFoundedBooks } from "../../redux/products/products";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

export const Header = () => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>("")

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const stringParams = searchParams.toString();
        dispatch(fetchFoundedBooks(stringParams))
    }, [searchParams]);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        setSearchParams((prevParams) => {
            if (!inputValue.length) {
                prevParams.delete("name");
            }
            else {
                prevParams.set("name", inputValue);
            }
            return prevParams;
        });
    }

    return (
        <div className={styles.header}>
            <img src={Logo} alt="Logo" />
            <CustomInput onChange={handleSearchInputChange} value={value} placeholder="Search..." inputType='text' disabled={false} isValid={true} isSearchInput={true} errorText='Error text...' width="542px" />
            <div className={styles.header_icons_container}>
                <img src={LikeLogo} alt="Like Icon" />
                <img src={ShopLogo} alt="Shop Icon" />
                <img src={UserLogo} alt="User Icon" />
            </div>
        </div>
    )
}
