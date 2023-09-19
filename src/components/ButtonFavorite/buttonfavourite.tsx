import styles from "./buttonfavourite.module.scss"
import DefLike from "../../utils/img/favourite_def.png";

export const ButtonFavourite = ({ disabled }: { disabled: boolean }) => {
    return(
        <div>
            <img src={DefLike} className={styles.like_icon}/>
        </div>
    )
}