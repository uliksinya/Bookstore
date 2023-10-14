import styles from "./burgermenu.module.scss";
import Burger from "../../utils/img/burger_menu_icon.png";
import { BurgMenuProps } from "../../api/types";

export const HeaderBurgerMenu = ({onClick} : BurgMenuProps) => {
    return(
        <div className={styles.burger_menu_container} onClick={onClick}>
            <img src={Burger}/>
        </div>
    )
}