import { CustomInput } from "../../components/CustomInput/input";
import styles from "./signuppage.module.scss";
import {useForm,  SubmitHandler} from 'react-hook-form';
import { SignInUpTabs } from "../../components/SignInUpTabs/SignInUpTabs";

export const SignUpPage = () => {
    
    type SignUpForm = {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpForm>({
        reValidateMode:'onChange',
        mode: 'onBlur',
    }); 
    
    const onSubmit: SubmitHandler<SignUpForm> = data => console.log(data);
    
    console.log(watch("name"));
    
    return(
        <div className={styles.signin_up_container}>
            <div className={styles.tabs_container}>
                <SignInUpTabs/>
            </div>      
            <div className={styles.line}></div>      
            <div className={styles.inputs_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput 
                 name='name'
                 value={watch('name')} 
                 labelValue="asd"
                 placeholder="Your Name" 
                 inputMode="text" 
                 disabled={false} 
                 {...register}
                //  isValid={true} 
                //  register={register} 
                //  validationSchema={{
                //     required: 'Необходимо заполнить поле name.',
                //     validate: {
                //         namePattern: (value: string) =>{
                //             if (value.length <= 10){
                //                 return true;
                //             }
                //             return "Ведите имя меньше 10 символов"
                //         }
                //     }
                // }}
                />

                {/* errors will return when field validation fails  */}
                {errors.name && <span>This field is required</span>}                
                <input type="submit" />
            </form>
                
            </div>
        </div>
    )
}