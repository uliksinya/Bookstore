import styles from "./button.module.scss";

export const ButtonAddToCart = ({ disabled }: { disabled: boolean }) => {
    return (
        <button className={disabled ? styles.btn_disabled : styles.btn}>
            <h3>Add To Cart</h3>
        </button>
    );
};