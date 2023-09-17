import styles from "./arrow.module.scss";

type ArrowType = "Prev" | "Next";

export const Arrow = (arrowText: ArrowType) => {
    <p className={arrowText==="Prev" ? styles.prev : styles.next}>{arrowText}</p>
}