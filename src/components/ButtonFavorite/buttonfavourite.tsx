import styles from './buttonfavourite.module.scss';
import { favouriteProps } from '../../types/types';

export const ButtonFavourite = ( {isFavourite, editFavStateFunc} : favouriteProps ) => {
    return(
        <div className={styles.like_icon} onClick={editFavStateFunc}>
            <div className={isFavourite ? styles.active_like : styles.default_like}></div>
        </div>
    )
}