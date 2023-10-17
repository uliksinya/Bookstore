import { CustomInput } from "../CustomInput/Input"
import styles from "./signin.module.scss";
import {useForm,  SubmitHandler} from 'react-hook-form';
import { SignInForm } from "../../types/types";
import { isThisUserInLS, confirmPassword, saveAutentificationUserInLS } from "../../utils/localStorage/signInUpLS";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { useState } from "react";
import CrossIcon from "../../assets/img/cross_icon.png";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/authentificationUser/authentificationUser";

export const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isCorrectPasssword, setIsCorrectPassword] = useState<boolean>(true);

    const redirectToHome = () => {
        navigate('/');
    } 
    const toggleNavToResetPassword = () => {
        navigate('/resetPassword');
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
            const isThisPassword = confirmPassword(data.name, data.password);
            if(isThisPassword){
                setIsCorrectPassword(true);
                saveAutentificationUserInLS(data.name);
                dispatch(setUser(data.name))
                redirectToHome();
            }
        }
        else{                
            setIsCorrectPassword(false);
        }
    }
 
    return(
        <div className={styles.sign_in_container}>
            {
                !isCorrectPasssword && 
                <div className={styles.not_success_container}>
                    <div className={styles.image}><img id={styles.done} src={CrossIcon}/></div>
                    <span id={styles.not_success_text}>The username or password is incorrect!</span>
                </div> 
            }
            <form className={styles.signin_form}>
                <div>
                    <div id={styles.input_item}>
                        <CustomInput 
                            {...register('name', {
                                required: 'Необходимо заполнить поле Name',
                            })}
                            name='name'
                            value={watch('name')} 
                            errorMessage={errors.name?.message}                        
                            labelValue="Name"
                            placeholder="Your Name" 
                            inputMode="text"                        
                        />
                    </div>
                    <div id={styles.input_item}>
                        <CustomInput 
                            {...register('password',{
                                required: 'Необходимо заполнить поле Password', 
                            })}
                            name='password'
                            value={watch('password')} 
                            errorMessage={errors.password?.message}                        
                            labelValue="Password"
                            placeholder="Your Password" 
                            inputMode="text"
                            type="password"       
                        /> 
                    </div>
                    <div className={styles.forgot_passw} onClick={() => toggleNavToResetPassword()}>
                        <span id={styles.forgot_passw_text}>Forgot password?</span>
                    </div>
                    <div className={styles.signup_submit}>
                        <Button disabled={false} content={'Sign in'} btnStyle={'dark'} onClick={handleSubmit(onSubmitSignIn)}/>
                    </div>
                </div> 
            </form>
        </div>
    )
}