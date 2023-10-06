import {useForm,  SubmitHandler} from 'react-hook-form';
import { SignUpForm } from '../../api/types';
import { CustomInput } from '../CustomInput/Input';
import styles from "./signup.module.scss";
import { emailValidator, passwordValidator,confirmPasswordValidator } from "../../hooks/validators/validators";
import { useState } from 'react';
import { registerUser } from "../../hooks/localStorage/localstorage";
import { Button } from '../Button/Button';
import DoneIcon from "../../utils/img/done_icon.png";
import { usernameValidator } from '../../hooks/validators/validators';

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
        {isUserRegister 
        ? 
        <div className={styles.success_container}>
            <div className={styles.image}><img id={styles.done} src={DoneIcon}/></div>
            <span id={styles.success_text}>Вы успешно зарегистрировались!</span>
        </div> 
        :
         ""}
        <form className={styles.registration_form} onSubmit={handleSubmit(onSubmitRegistration)}>
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
                                validate: (value: string) => confirmPasswordValidator(value, watch('password')),
                            }
                        }
                        />
                        <div className={styles.signup_submit}>
                            <Button disabled={false} content={'Sign up'} btnStyle={'dark'}/>
                        </div>
                </div>
            </div>
        </form> 
        </div>
    )
}  
