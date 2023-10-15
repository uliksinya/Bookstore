import styles from "./subscribe.module.scss";
import { SaveEmailForSubscribe } from '../../utils/localStorage/saveEmailInLS.ts';
import {useForm,  SubmitHandler} from 'react-hook-form';
import { SubscribeEmailForm } from "../../types/types.ts";
import { CustomInput } from "../CustomInput/Input.tsx";
import { emailValidator } from "../../utils/validators/validators.ts";

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
                            {...register('email', {
                                required: 'Необходимо заполнить поле Email',
                                validate: emailValidator,
                            })}
                            name='email'
                            value={watch('email')} 
                            errorMessage={errors.email?.message}                        
                            placeholder="Your Email" 
                            inputMode="email"   
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