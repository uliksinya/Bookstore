import { useState } from "react";
import styles from "./signinuptabs.module.scss";
import { authorisationType } from "../../api/types";

interface tabsProps{
    activeTab: authorisationType;    
    setActiveTab: (str: authorisationType) => void;   
}  
export const SignInUpTabs = ({activeTab, setActiveTab} : tabsProps) => {   

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