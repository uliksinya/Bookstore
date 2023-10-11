import { Outlet } from 'react-router-dom';
import styles from './acclayout.module.scss';

export const AccountLayout = () => {
    return( 
        <div className={styles.layout_wrapper}>            
            <Outlet />
        </div>
    )
}