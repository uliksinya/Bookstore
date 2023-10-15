import styles from './signinuppage.module.scss';
import { SignInUpTabs } from "../../components/SignInUpTabs/SignInUpTabs";
import { useState } from "react";
import { authorisationType } from "../../api/types";
import { SignIn } from "../../components/SignIn/SignIn";
import { SignUp } from "../../components/SignUp/SignUp";
import { useLocation } from 'react-router-dom';

export const SignInUpPage = () => {    
    const [activeTab, setActiveTab] = useState<authorisationType>("SIGN IN"); 
    const location = useLocation();
    console.log(location);

    const isLocationFromNewPassword = location.state?.from.pathname === '/resetPassword/newPassword';

    return(
        <div className={activeTab ==='SIGN UP' ? styles.sign_up_container : styles.sign_in_container}>
            <div className={styles.tabs_container}>
                <SignInUpTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>      
            {
                isLocationFromNewPassword === true 
                ? 
                <div className={styles.changed_container}>
                    <p>Password has been changed!</p>
                </div> 
                :
                null             
            }
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