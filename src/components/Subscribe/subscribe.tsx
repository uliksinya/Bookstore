import { CustomInput } from "../CustomInput/input";
import styles from "./subscribe.module.scss";

export const Subscribe = () => {
    return(
        <div className={styles.subscribe_container}>
            <div className={styles.content_container}>
                <div className={styles.text_container}>
                    <div className={styles.title_container}><h2 id={styles.title}>Subscribe to Newsletter</h2></div>
                    <p>Be the first to know about new IT books, upcoming releases, exclusive offers and more.</p>
                </div>
                <div className={styles.input_container}>
                    <input className={styles.subscribe_input}/>
                    <button><p id={styles.button_text}>Subscribe</p></button>
                </div>
            </div>           
        </div>
    )
    
}