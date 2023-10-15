import {useForm,  SubmitHandler} from 'react-hook-form';
import { AccountPageType } from '../../types/types';
import styles from "./accountpage.module.scss";
import { CustomInput } from '../../components/CustomInput/Input';
import { usernameValidator, emailValidator, passwordValidator,confirmPasswordValidator } from "../../utils/validators/validators";
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuthUsernameFromLS, getAuthPasswordFromLS, getAuthEmailFromLS, updateAutentificationUserInLS} from '../../utils/localStorage/signInUpLS';
import { ArrowBack } from '../../components/ArrowBack/ArrowBack';

export const AccountPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authUsername = getAuthUsernameFromLS();
        const authEmail = getAuthEmailFromLS();
        const authPassword = getAuthPasswordFromLS();
        if (authUsername !== null ){
            setValue('name', authUsername);
        }
        if (authEmail !== null ){
            setValue('email', authEmail);
        }
        if (authPassword !== null ){
            setValue('password', authPassword);
        }
    }, []);    

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AccountPageType>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 

    const clearFields = () => {
        setValue('name', '');
        setValue('email', '');
        setValue('password', '');
        setValue('newPassword', '');
        setValue('confirmPassword', '');
    }
    const onSubmitRegistration: SubmitHandler<AccountPageType> = data => {
        clearFields();
        updateAutentificationUserInLS(data.name, data.email, data.newPassword);   
        toggleNavigateToSignIn();
    }
    const toggleNavigateToStartPage = () => {
        clearFields();
        if (navigate && navigate !== undefined) {
            navigate('/');
        } else {
            console.error('Navigate function is undefined or not set.');
        }
    }    
    const toggleNavigateToSignIn = () => {
        navigate('/signin');
    }
    return(
        <div className={styles.account_container}>
            <ArrowBack/>
            <h1 className={styles.title_text}>Account</h1>            
            <form className={styles.registration_form}>
                    <div className={styles.inputs_cont}>
                        <div className={styles.profile_title}><h3>Profile</h3></div>
                        <div className={styles.profile_container}>
                            <div id={styles.input_item}>
                                <CustomInput 
                                    {...register('name', {
                                        required: 'Необходимо заполнить поле Name',
                                        validate: usernameValidator,
                                    })}
                                    name='name'
                                    value={watch('name')} 
                                    errorMessage={errors.name?.message}                        
                                    labelValue="Name"
                                    placeholder="Your Name" 
                                    inputMode="text"
                                />
                            </div>
                            <div className={styles.email_inp} id={styles.input_item}>
                                <CustomInput 
                                    {...register('email', {
                                        required: 'Необходимо заполнить поле Email',
                                        validate: emailValidator,
                                    })}
                                    name='email'
                                    value={watch('email')} 
                                    errorMessage={errors.email?.message}                        
                                    labelValue="Email"
                                    placeholder="Your Email" 
                                    inputMode="email"      
                                />
                            </div> 
                        </div> 
                            <div className={styles.password_title}><h3>Password</h3></div>              
                            <div id={styles.input_item}>                    
                                <CustomInput 
                                    {...register('password', {
                                        required: 'Необходимо заполнить поле Password', 
                                        validate: passwordValidator,
                                    })}
                                    name='password'
                                    value={watch('password')} 
                                    errorMessage={errors.password?.message}                        
                                    labelValue="Password"
                                    placeholder="Your Password" 
                                    type='password'
                                />                
                            </div>
                            <div className={styles.new_password}>
                                <div id={styles.input_item}>                    
                                    <CustomInput 
                                        {...register('newPassword', {
                                            required: 'Необходимо заполнить поле New Password', 
                                            validate: passwordValidator,
                                        })}
                                        name='newPassword'
                                        value={watch('newPassword')} 
                                        errorMessage={errors.newPassword?.message}                        
                                        labelValue="New Password"
                                        placeholder="New Password" 
                                        type='password'
                                    />                
                                </div>
                                <div className={styles.confirm_passw_inp} id={styles.input_item}>                
                                    <CustomInput 
                                        {...register('confirmPassword', {
                                            required: 'Необходимо заполнить поле Confirm Password', 
                                            validate: (value: string) => confirmPasswordValidator(value, watch('newPassword'))
                                        })}
                                        name='confirmPassword'
                                        value={watch('confirmPassword')} 
                                        errorMessage={errors.confirmPassword?.message}                        
                                        labelValue="Confirm Password"
                                        placeholder="Confirm Your Password" 
                                        type='password'
                                    />
                                </div> 
                            </div>
                            <div className={styles.line_account}></div>
                            <div className={styles.buttont_container}>
                                <div className={styles.save_btn}>
                                    <Button disabled={false} content={'Save changes'} btnStyle={'dark'} onClick={handleSubmit(onSubmitRegistration)}/>
                                </div>
                                <div className={styles.cancel_btn}>
                                    <Button disabled={false} content={'Cancel'} btnStyle={'light'} onClick={() => toggleNavigateToStartPage()}/>
                                </div>
                            </div>
                    </div>
            </form> 
        </div>
    )
}