import { useState } from "react";
import styles from "./signinuptabs.module.scss";

export const SignInUpTabs = () => {
    const [activeTab, setActiveTab] = useState<string>("Description")

    const toggleTabVisibility = (tabName: string) => {
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