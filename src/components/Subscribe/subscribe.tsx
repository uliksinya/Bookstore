import styles from "./subscribe.module.scss";

export const Subscribe = () => {
    return(
        <div className={styles.subscribe_container}>
            <div className={styles.subscribe_content_container}>
                <div className={styles.text_container}>
                    <div className={styles.title_container}><h2 id={styles.title}>Subscribe to Newsletter</h2></div>
                    <div><p id={styles.subscr_text}>Be the first to know about new IT books, upcoming releases, exclusive offers and more.</p></div>
                </div>
                <div className={styles.input_container}>
                    <input className={styles.subscribe_input} placeholder="Your Email"/>
                    <button className={styles.subscribe_button}>
                        <p id={styles.button_text}>
                            Subscribe
                        </p>
                    </button>
                </div>
            </div>           
        </div>
    )
    
}