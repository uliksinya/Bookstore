import styles from "./footer.module.scss";

export const Foooter = () => {
    return(
        <div className={styles.footer}>
            <div id={styles.line}> </div>
            <div className={styles.footer_text}>
                <div><p>©2022 Bookstore</p></div>
                <div><p>All rights reserved</p></div>
            </div>
        </div>
    )
}