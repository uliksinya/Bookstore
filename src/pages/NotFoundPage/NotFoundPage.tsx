import ErrorImg from '../../utils/img/404.png';
import styles from "./notfoundpage.module.scss";

export const NotFoundPage = () => {
    return(
        <div className={styles.not_found_page}>
            <h1>Page not found!</h1>
            <img src={ErrorImg} id={styles.eroor_img}/>
        </div>
    )
}