import styles from "./header.module.scss"
import Logo from "../../utils/img/bookstore_logo.png"
import LikeLogo from "../../utils/img/Like_icon.png";
import ShopLogo from "../../utils/img/Shop_icon.png";
import UserLogo from "../../utils/img/User_icon.png";

export const Header = () => {
    return(
        <div className={styles.header}>
            <img src={Logo}/>
            <div className={styles.header_icons_container}>
                <img src={LikeLogo}/>
                <img src={ShopLogo}/>
                <img src={UserLogo}/>
            </div>
        </div>
    )
}