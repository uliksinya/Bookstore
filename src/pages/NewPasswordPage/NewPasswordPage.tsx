import styles from './newpasswordpage.module.scss';
import { NewPasswordForm } from "../../api/types";
import {useForm,  SubmitHandler} from 'react-hook-form';
import { CustomInput } from "../../components/CustomInput/Input";
import { Button } from "../../components/Button/Button";
import {passwordValidator, confirmPasswordValidator } from "../../hooks/validators/validators";
import { saveNewPasswordByResetUserLS } from "../../hooks/localStorage/resetPasswordLS";
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
                                inpName='newPassword'
                                value={watch('newPassword')} 
                                labelValue="Password"
                                placeholder="Your Password" 
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
                            <div id={styles.input_item_new_passw}>                
                                <CustomInput 
                                inpName='confirmNewPassword'
                                value={watch('confirmNewPassword')} 
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
                    </div>
                <div className={styles.btn_container}>
                    <Button disabled={false} content={'Set Password'} btnStyle={"dark"} onClick={handleSubmit(onSubmitNewPassword)}/>
                </div>
            </div>
        </div>      
    )
}