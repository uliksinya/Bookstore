import React from "react";
import styles from "./input.module.scss";
import searchIcon from "../../utils/img/search_icon.png";
import type {InputType}  from "../../api/types";
import { FieldValues, InternalFieldName } from "react-hook-form";

export const CustomInput = ({
  name,
  inputMode,
  labelValue,
  placeholder,
  disabled = false,
  onChange,  
  ...other
} : React.InputHTMLAttributes<HTMLInputElement> & InputType ) => {
  
  return (
        <div>
          <div className={styles.input_container}>
            <label className={styles.inputLabel}>{labelValue}</label>
            <input
              className={`${other.value ? styles.active_input : styles.default_input}`}
              value={other.value}
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              type={inputMode}
              {...other}
              
            />
            {/* {errors?.[name]?.message !== undefined ?  <label className={styles.errorLabel}>{errors[name]?.message}</label>  : ''}   */}
            {/* {
              <div className={styles.searchIcon_container}>
                <img src={searchIcon} alt="Search Icon" className={styles.searchIcon} />
              </div>
            } */}
          </div> 
        </div> 
  );
}