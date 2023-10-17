import ActiveStar from "../../assets/img/active_star.png";
import NotActiveStar from "../../assets/img/not_active_star.png";
import styles from './gradecontainer.module.scss';

export const GradeContainer = ({ bookRating } : { bookRating: string }) => {
    const maxRating : number = 5;
    const activeStars : number = Number(bookRating);
    const notActiveStars : number = maxRating - activeStars;
    const stars = [];
    const notActiveArr = [];
            
    if(activeStars !== 0){
        for (let i = 0; i < activeStars; i++) {
            stars.push(<img key={i} src={ActiveStar} alt="Active Star" />);
        }
        for (let i = 0; i < notActiveStars; i++) {
            stars.push(<img key={i + activeStars} src={NotActiveStar} alt="Inactive Star" />);
        }
    }
    else{
        for (let i = 0; i < 5; i++) {
            notActiveArr.push(<img key={i} src={NotActiveStar} alt="Inactive Star" />);
        }
    }

    return (
        <div className={styles.rating_container}>
            {activeStars !== 0 ? stars : notActiveArr}
        </div>
    );
}