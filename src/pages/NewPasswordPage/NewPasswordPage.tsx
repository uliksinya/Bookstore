import styles from './newpasswordpage.module.scss';
import { NewPasswordForm } from "../../types/types";
import {useForm,  SubmitHandler} from 'react-hook-form';
import { CustomInput } from "../../components/CustomInput/Input";
import { Button } from "../../components/Button/Button";
import {passwordValidator, confirmPasswordValidator } from "../../utils/validators/validators";
import { saveNewPasswordByResetUserLS } from "../../utils/localStorage/resetPasswordLS";
import { useLocation, useNavigate } from 'react-router-dom';

export const NewPasswordPage = () => {    
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<NewPasswordForm>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 
    const onSubmitNewPassword: SubmitHandler<NewPasswordForm> = data => {
        setValue('newPassword', '');
        setValue('confirmNewPassword', '');
        saveNewPasswordByResetUserLS(data.newPassword);
        navigate('/signin', {state: {from: location}});
    }
    console.log(location);
    return(            
       <div className={styles.new_passw_cont}>
            <div className={styles.content_container}>
                    <h1 className={styles.title}>New Password</h1>
                    <div className={styles.inputs}>
                        <div className={styles.new_password}>
                            <div id={styles.input_item}>                    
                                <CustomInput 
                                {...register('newPassword', {
                                    required: 'Необходимо заполнить поле Password',
                                    validate: (value) => passwordValidator(value),
                                })}
                                name='newPassword'
                                value={watch('newPassword')} 
                                errorMessage={errors.newPassword?.message}                        
                                labelValue="Password"
                                placeholder="Your Password" 
                                type='password'   
                                />                
                            </div>
                            <div id={styles.input_item_new_passw}>                
                                <CustomInput 
                                {...register('confirmNewPassword', {
                                    required: 'Необходимо заполнить поле Confirm password', 
                                    validate: (value) => confirmPasswordValidator(value, watch('confirmNewPassword')),
                                })}
                                name='confirmNewPassword'
                                value={watch('confirmNewPassword')} 
                                errorMessage={errors.confirmNewPassword?.message}                        
                                labelValue="Confirm Password"
                                placeholder="Confirm your password" 
                                type='password'   
                                />
                            </div> 
                        </div>
                    </div>
                <div className={styles.btn_container}>
                    <Button disabled={false} content={'Set Password'} btnStyle={"dark"} onClick={handleSubmit(onSubmitNewPassword)}/>
                </div>
            </div>
        </div>      
    )
}