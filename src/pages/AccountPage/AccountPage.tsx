import {useForm,  SubmitHandler} from 'react-hook-form';
import { AccountPageType } from '../../api/types';
import styles from "./accountpage.module.scss";
import { CustomInput } from '../../components/CustomInput/Input';
import { usernameValidator, emailValidator, passwordValidator,confirmPasswordValidator } from "../../hooks/validators/validators";
import { Button } from '../../components/Button/Button';
import ArrowIcon from "../../utils/img/arrow_icon.png";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuthUsernameFromLS, getAuthPasswordFromLS, getAuthEmailFromLS, updateAutentificationUserInLS} from '../../hooks/localStorage/SignInUpLS';

export const AccountPage = () => {
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
    }, [])

    const navigate=useNavigate();

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
    const toggleNavigateToHome = () => {
        clearFields();
        if (navigate && navigate !== undefined) {
            navigate('/');
        } else {
            console.error('Navigate function is undefined or not set.');
        }
    }
    
    const toggleNavigateToSignIn = () => {
        clearFields()
        navigate('/signup');
    }
    return(
    <div className={styles.account_container}>
        <div className={styles.img_container} onClick={toggleNavigateToHome}>
            <img src={ArrowIcon}/>
        </div>
        <h1 className={styles.title_text}>Account</h1>
        
        <form className={styles.registration_form}>
                <div className={styles.inputs_cont}>
                    <div className={styles.profile_title}><h3>Profile</h3></div>
                    <div className={styles.profile_container}>
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
                            validationRules={
                                {
                                    required: 'Необходимо заполнить поле Name',
                                    validate: usernameValidator,
                                }
                            }
                            />
                        </div>
                        <div id={styles.input_item}>
                            <CustomInput 
                            inpName='email'
                            value={watch('email')} 
                            labelValue="Email"
                            placeholder="Your Email" 
                            inpMode="text" 
                            errors={errors} 
                            disabled={false} 
                            register={register}
                            validationRules={
                                {
                                    required: 'Необходимо заполнить поле Email', 
                                    validate: emailValidator,
                                }
                            }
                            />
                        </div> 
                    </div> 
                        <div className={styles.password_title}><h3>Password</h3></div>              
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
                            validationRules={
                                {
                                    required: 'Необходимо заполнить поле Password', 
                                    validate: passwordValidator,
                                }
                            }
                            />                
                        </div>
                        <div className={styles.new_password}>
                            <div id={styles.input_item}>                    
                                <CustomInput 
                                inpName='newPassword'
                                value={watch('newPassword')} 
                                labelValue="New Password"
                                placeholder="New Password" 
                                inpMode="password"
                                disabled={false} 
                                errors={errors} 
                                register={register}
                                validationRules={
                                    {
                                        required: 'Необходимо заполнить поле newPassword', 
                                        validate: passwordValidator,
                                    }
                                }
                                />                
                            </div>
                            <div id={styles.input_item}>                
                                <CustomInput 
                                inpName='confirmPassword'
                                value={watch('confirmPassword')} 
                                labelValue="Confirm Password"
                                placeholder="Confirm your password" 
                                inpMode="password" 
                                disabled={false} 
                                errors={errors} 
                                register={register}
                                validationRules={
                                    {
                                        required: 'Необходимо заполнить поле Confirm password', 
                                        validate: (value: string) => confirmPasswordValidator(value, watch('newPassword')),
                                    }
                                }
                                />
                            </div> 
                        </div>
                        <div className={styles.line_account}></div>
                        <div className={styles.buttont_container}>
                            <div className={styles.save_btn}>
                                <Button disabled={false} content={'Save changes'} btnStyle={'dark'} onClick={handleSubmit(onSubmitRegistration)}/>
                            </div>
                            <div className={styles.cancel_btn}>
                                <Button disabled={false} content={'Cancel'} btnStyle={'light'} onClick={() => toggleNavigateToHome()}/>
                            </div>
                        </div>
                </div>
        </form> 
    </div>
)}