import { ResetPasswordForm } from "../../types/types";
import {useForm,  SubmitHandler} from 'react-hook-form';
import { CustomInput } from "../../components/CustomInput/Input";
import { isSuchUsernameInLS } from "../../utils/validators/validators";
import { Button } from "../../components/Button/Button";
import { saveResetUser } from "../../utils/localStorage/resetPasswordLS";
import styles from './resetpassword.module.scss';
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {  
    const navigate = useNavigate();  
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ResetPasswordForm>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 
    const onSubmitReset: SubmitHandler<ResetPasswordForm> = data => {
        setValue('name', '');
        saveResetUser(data.name);
        navigate('/resetPassword/newPassword');
    }
    return(            
       <div className={styles.reset_passw_cont}>
        <div className={styles.content_container}>
            <h1 className={styles.title}>Reset Password</h1>
            <div id={styles.input_item}>
                <CustomInput 
                    {...register('name', {
                        required: 'Необходимо заполнить поле Name',
                        validate: (value) => isSuchUsernameInLS(value),
                    })}
                    name='name'
                    value={watch('name')} 
                    errorMessage={errors.name?.message}                        
                    labelValue="Name"
                    placeholder="Your Name" 
                    inputMode="text"            
                />
                <div className={styles.btn_container}>
                    <Button disabled={false} content={'Reset'} btnStyle={"dark"} onClick={handleSubmit(onSubmitReset)}/>
                </div>
            </div>
            </div>
       </div>       
    )
}