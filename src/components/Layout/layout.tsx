import styles from "./layout.module.scss"
import { Header } from "../Header/header";
import { Foooter } from "../Footer/footer";
import { Outlet} from 'react-router-dom';

export const Layout = () => {
    return (
    <div className={styles.layout}>
        <div className={styles.header}><Header /></div>
        <div className={styles.content}><Outlet /></div>
        <div className={styles.footer}><Foooter /></div>
    </div>
    );    
}