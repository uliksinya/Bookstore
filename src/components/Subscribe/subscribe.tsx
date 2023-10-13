import styles from "./subscribe.module.scss";
import { SaveEmailForSubscribe } from '../../hooks/localStorage/saveEmailInLS.ts';
import {useForm,  SubmitHandler} from 'react-hook-form';
import { SubscribeEmailForm } from "../../api/types.ts";
import { CustomInput } from "../CustomInput/Input.tsx";
import { emailValidator } from "../../hooks/validators/validators.ts";

export const Subscribe = () => {
    const toggleSendEmail = (email: string) => {
        SaveEmailForSubscribe(email);
    }
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SubscribeEmailForm>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 
    const onSubmitEmail: SubmitHandler<SubscribeEmailForm> = data => {
        setValue('email', '');
        toggleSendEmail(data.email);
    }
    return(
        <div className={styles.subscribe_container}>
            <div className={styles.subscribe_content_container}>
                <div className={styles.text_container}>
                    <div className={styles.title_container}><h2 id={styles.title}>Subscribe to Newsletter</h2></div>
                    <div><p id={styles.subscr_text}>Be the first to know about new IT books, upcoming releases, exclusive offers and more.</p></div>
                </div>
                <div className={styles.input_container}>                    
                    <div className={styles.input_item}>
                        <CustomInput 
                        inpName='email'
                        value={watch('email')} 
                        labelValue=""
                        placeholder="Your email" 
                        inpMode="text" 
                        errors={errors} 
                        disabled={false}                   
                        register={register}
                        myMod={'subscribe'}
                        validationRules={
                            {
                                required: 'Необходимо заполнить поле Email', 
                                validate: emailValidator,
                            }
                        }
                        />
                    </div>
                    <button className={styles.subscribe_button} onClick={handleSubmit(onSubmitEmail)}>
                        <p id={styles.button_text}>
                            Subscribe
                        </p>
                    </button>
                </div>
            </div>           
        </div>
    )
    
}