import { FooterArr } from "../../../api/types";
import { Button } from "../../Button/Button";
import styles from "./carttotal.module.scss"

interface CartFooterProps{
    arr: FooterArr[],
    onClick: () => void,
}
export const CartTotalFooter = ({arr, onClick} : CartFooterProps) => {
    return(
        <div className={styles.cart_footer}>
            <div className={styles.sum_footer}>
                <div key={0} className={styles.sum_item} id={styles.sum_item}>
                    <div><p>{arr[0].title}</p></div>
                    <div><p id={styles.price_item}>{arr[0].price}</p></div>
                </div>
                <div key={1} className={styles.sum_item} id={styles.vat}>
                    <div><p>{arr[1].title}</p></div>
                    <div><p id={styles.price_item}>{arr[1].price}</p></div>
                </div>
                <div key={2} className={styles.sum_total}>
                    <h3  id={styles.sum_total}>{arr[2].title}:</h3>
                    <p  id={styles.sum_total}>{arr[2].price}</p>
                </div>
                </div>
            <div className={styles.btn_cont}>
                <Button disabled={false} content={"Check Out"} btnStyle={"dark"} onClick={onClick}/>
            </div>
        </div>
    )
}