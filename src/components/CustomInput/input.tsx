import React, {ForwardedRef} from "react";
import styles from "./input.module.scss";

export const CustomInput = React.forwardRef(({
  labelValue,
  errorMessage, 
  value,
  ...rest
} : React.InputHTMLAttributes<HTMLInputElement> & {
  labelValue?: string,
  errorMessage?: string
},
  ref : ForwardedRef<HTMLInputElement>
) => {  

  return (
        <div>
          <div className={styles.input_container}>
            <label className={styles.inputLabel}>{labelValue}</label>
            <input
              className={value ? styles.active_input : styles.default_input} {...rest} ref={ref}                   
            />
          </div> 
          {errorMessage && <span id={styles.error_message}>{errorMessage}</span>}
        </div> 
  );
}
);
    