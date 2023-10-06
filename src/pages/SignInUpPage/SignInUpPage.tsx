import styles from './signinuppage.module.scss';
import { SignInUpTabs } from "../../components/SignInUpTabs/SignInUpTabs";
import { useState } from "react";
import { authorisationType } from "../../api/types";
import { SignIn } from "../../components/SignIn/SignIn";
import { SignUp } from "../../components/SignUp/SignUp";

export const SignInUpPage = () => {    
    const [activeTab, setActiveTab] = useState<authorisationType>("SIGN IN");    
    return(
        <div className={activeTab ==='SIGN UP' ? styles.sign_up_container : styles.sign_in_container}>
            <div className={styles.tabs_container}>
                <SignInUpTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>      
            <div className={styles.tabs_line}></div>
            <div className={styles.line}></div>   
            <div className={styles.inputs_container}>            
            {
                activeTab ==='SIGN UP' ?  <SignUp/> : <SignIn/>       
            }
            </div>          
        </div>
    )
}