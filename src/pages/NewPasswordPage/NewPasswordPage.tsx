import styles from './newpasswordpage.module.scss';
import { NewPasswordForm, ResetPasswordForm } from "../../api/types";
import {useForm,  SubmitHandler} from 'react-hook-form';
import { CustomInput } from "../../components/CustomInput/Input";
import { Button } from "../../components/Button/Button";
import {passwordValidator, confirmPasswordValidator } from "../../hooks/validators/validators";
import { saveNewPasswordByResetUserLS } from "../../hooks/localStorage/resetPasswordLS";

export const NewPasswordPage = () => {    
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<NewPasswordForm>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 
    const onSubmitNewPassword: SubmitHandler<NewPasswordForm> = data => {
        setValue('newPassword', '');
        setValue('confirmNewPassword', '');

        saveNewPasswordByResetUserLS(data.newPassword);
    }
    return(            
       <div className={styles.reset_passw_cont}>
            <div className={styles.content_container}>
                    <h1 className={styles.title}>New Password</h1>
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
                <div className={styles.btn_container}>
                    <Button disabled={false} content={'Reset'} btnStyle={"dark"} onClick={handleSubmit(onSubmitNewPassword)}/>
                </div>
            </div>
        </div>      
    )
}