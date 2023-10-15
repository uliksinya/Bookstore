import styles from "./arrowback.module.scss";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../utils/img/arrow_icon.png";

export const ArrowBack = () => {
    const navigate = useNavigate();  
    const toggleNavigateToStartPage = () => {
        navigate('/');
    }     
    return(
    <div className={styles.img_container} onClick={toggleNavigateToStartPage}>
        <img src={ArrowIcon}/>
    </div>
    )
}