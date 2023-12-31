import styles from "./button.module.scss";
import { ButtonProps } from "../../types/types";

export const Button = ({disabled, content, btnStyle, onClick} : ButtonProps) => {
    return (
        btnStyle === "light" 
        ? 
        <button className={disabled ? styles.btn_disabled : styles.btn_light} onClick={onClick}>
            <h3 id={styles.btn_light_text}>{content}</h3>
         </button>
        :
        <button className={disabled ? styles.btn_disabled : styles.btn_dark} onClick={onClick}>
            <h3 id={styles.btn_dark_text}>{content}</h3>
        </button>
    );
};