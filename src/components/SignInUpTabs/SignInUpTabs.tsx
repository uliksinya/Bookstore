import styles from "./signinuptabs.module.scss";
import { authorisationType } from "../../api/types";
import { SignInUpTabsProps } from "../../api/types";

export const SignInUpTabs = ({activeTab, setActiveTab} : SignInUpTabsProps) => {   

    const toggleTabVisibility = (tabName: authorisationType) => {
      setActiveTab(tabName);
    };

    return(           
        <div className={styles.sign_in_up_tabs}>
            <div
                id={styles.menu_item}    
                onClick={() => toggleTabVisibility("SIGN IN")}
                className={activeTab === "SIGN IN" ? styles.active_tab : styles.not_active_tab}
            >
                <p id={styles.sign_in_text}>SIGN IN</p>
            </div>
            <div
                id={styles.menu_item}    
                onClick={() => toggleTabVisibility("SIGN UP")}
                className={activeTab === "SIGN UP" ? styles.active_tab : styles.not_active_tab}
            >
                <p id={styles.sign_up_text}>SIGN UP</p>
            </div>            
            <div id={styles.line}></div>
        </div>
    )
}