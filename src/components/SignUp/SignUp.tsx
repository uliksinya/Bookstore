import {useForm,  SubmitHandler} from 'react-hook-form';
import { SignUpForm } from '../../types/types';
import { CustomInput } from '../CustomInput/Input';
import styles from "./signup.module.scss";
import { emailValidator, passwordValidator,confirmPasswordValidator } from "../../utils/validators/validators";
import { useState } from 'react';
import { registerUser } from "../../utils/localStorage/signInUpLS";
import { Button } from '../Button/Button';
import DoneIcon from "../../assets/img/done_icon.png";
import { usernameValidator } from '../../utils/validators/validators';

export const SignUp = () => {
    const [isUserRegister, setIsUserRegistered] = useState<boolean>(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignUpForm>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 

    const onSubmitRegistration: SubmitHandler<SignUpForm> = data => {
        setValue('name', '');
        setValue('email', '');
        setValue('password', '');
        setValue('confirmPassword', '');
        const isRegistered = registerUser({username: data.name, email: data.email, password: data.password}); 
        if (isRegistered) {
            setIsUserRegistered(true);
        }
    }
    return(
        <div id={styles.sign_up_container}>
        {
            isUserRegister 
            ? 
            <div className={styles.success_container}>
                <div className={styles.image}><img id={styles.done} src={DoneIcon}/></div>
                <span id={styles.success_text}>Вы успешно зарегистрировались!</span>
            </div> 
            :
            ""
        }
        <form className={styles.registration_form}>
            <div>
                <div id={styles.input_item}>
                        <CustomInput 
                        {...register('name', {
                            required: 'Необходимо заполнить поле Name',
                            validate: (value) => usernameValidator(value),
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
                        {...register('email', {
                            required: 'Необходимо заполнить поле Email',
                            validate: (value) => emailValidator(value),
                        })}
                        name='email'
                        value={watch('email')} 
                        errorMessage={errors.email?.message}                        
                        labelValue="Email"
                        placeholder="Your Email" 
                        inputMode="email"            
                        />
                    </div>                
                    <div id={styles.input_item}>                    
                        <CustomInput 
                        {...register('password', {
                            required: 'Необходимо заполнить поле Password',
                            validate: (value) => passwordValidator(value),
                        })}
                        name='password'
                        value={watch('password')} 
                        errorMessage={errors.password?.message}                        
                        labelValue="Password"
                        placeholder="Your Password" 
                        type='password'             
                        />                
                    </div>
                    <div id={styles.input_item}>                
                        <CustomInput 
                        {...register('confirmPassword', {
                            required: 'Необходимо заполнить поле Confirm Password',
                            validate: (value) => confirmPasswordValidator(value, watch('password')),
                        })}
                        name='confirmPassword'
                        value={watch('confirmPassword')} 
                        errorMessage={errors.confirmPassword?.message}                        
                        labelValue="Confirm Password"
                        placeholder="Confirm Your Password" 
                        type='password'  
                        />
                        <div className={styles.signup_submit}>
                            <Button disabled={false} content={'Sign up'} btnStyle={'dark'} onClick={handleSubmit(onSubmitRegistration)}/>
                        </div>
                </div>
            </div>
        </form> 
        </div>
    )
}  
