import { CustomInput } from "../CustomInput/Input"
import styles from "./signin.module.scss";
import {useForm,  SubmitHandler} from 'react-hook-form';
import { SignInForm } from "../../api/types";
import { isThisUserInLS, confirmPassword, saveAutentificationUserInLS } from "../../hooks/localStorage/SignInUpLS";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { useState } from "react";
import CrossIcon from "../../utils/img/cross_icon.png";

export const SignIn = () => {
    const navigate = useNavigate();
    const [isCorrectPasssword, setIsCorrectPassword] = useState<boolean>(true);
    const redirectToHome = () => {
        navigate('/books');
    } 
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignInForm>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 
    const onSubmitSignIn: SubmitHandler<SignInForm> = data => {
        setValue('name', '');
        setValue('password', '');

        const isUserRegistered = isThisUserInLS(data.name);
        if(isUserRegistered){
            console.log("Вошли в условие")
            const isThisPassword = confirmPassword(data.name, data.password);
            if(isThisPassword){
                setIsCorrectPassword(true);
                saveAutentificationUserInLS(data.name);
                redirectToHome();
            }
        }
        else{                
            setIsCorrectPassword(false);
        }
    }
    return(
        <div className={styles.sign_in_container}>
            {!isCorrectPasssword 
            ? 
            <div className={styles.not_success_container}>
                <div className={styles.image}><img id={styles.done} src={CrossIcon}/></div>
                <span id={styles.not_success_text}>Неверное имя пользователя или пароль!</span>
            </div> 
            :
            ""}
            <form className={styles.signin_form} onSubmit={handleSubmit(onSubmitSignIn)}>
                <div>
                    <div id={styles.input_item}>
                        <CustomInput 
                        inpName='name'
                        value={watch('name')} 
                        labelValue="Name"
                        placeholder="Your Name" 
                        inpMode="text" 
                        errors={errors} 
                        disabled={false}                   
                        register={register}
                        />
                    </div>
                    <div id={styles.input_item}>
                        <CustomInput 
                            inpName='password'
                            value={watch('password')} 
                            labelValue="Password"
                            placeholder="Your Password" 
                            inpMode="password"
                            disabled={false} 
                            errors={errors} 
                            register={register}
                        /> 
                    </div>
                    <div className={styles.forgot_passw}>
                        <span id={styles.forgot_passw_text}>Forgot password?</span>
                    </div>
                    <div className={styles.signup_submit}>
                        <Button disabled={false} content={'Sign in'}/>
                    </div>
                </div> 
            </form>
        </div>
    )
}