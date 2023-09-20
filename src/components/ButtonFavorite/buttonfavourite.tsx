import styles from './buttonfavourite.module.scss';
import { useState } from 'react';

export const ButtonFavourite = ({ disabled }: { disabled: boolean }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const changeLikeState = () => {
        setIsLiked(!isLiked);
    }
    return(
        <div className={styles.like_icon} onClick={changeLikeState}>
            <div className={isLiked ? styles.active_like : styles.default_like}></div>
        </div>
    )
}