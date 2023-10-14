import React from "react";
import styles from "./input.module.scss";
import type {InputType}  from "../../api/types";

export const CustomInput= ({
  inpName,
  inpMode,
  labelValue,
  placeholder,
  disabled = false, 
  value='',
  register,
  validationRules,
  errors,
  defValue,
} : React.InputHTMLAttributes<HTMLInputElement> & InputType ) => {   

  return (
        <div>
          <div className={styles.input_container}>
            <label className={styles.inputLabel}>{labelValue}</label>
            <input
              className={`${value || defValue ? styles.active_input : styles.default_input}`}           
              defaultValue={defValue}
              value={value ? value : defValue}
              placeholder={placeholder}             
              disabled={disabled}
              type={inpMode}   
              {...register(inpName, validationRules)}            
            />
          </div> 
          {errors?.[inpName] ? <span id={styles.error_message}>{errors[inpName]?.message}</span> : ""}
        </div> 
  );
}
    