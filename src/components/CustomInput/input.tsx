import React from "react";
import styles from "./input.module.scss";
import searchIcon from "./search_icon.png";

type InputType = "text" | "email" | "password" | "tel";

interface InputProps {
  onChange:(e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  value: string;
  placeholder: string;
  inputTitle: string;
  inputType: InputType;
  disabled: boolean;
  isValid:boolean;
  isSearchInput: boolean;
  errorText: string;
  width?:string;
}
export const CustomInput = ({
  onChange,
  value,
  placeholder,
  inputTitle,
  inputType,
  disabled = false,
  isValid,
  errorText,
  isSearchInput,
  width,
}: InputProps) => {
  return (
        <div>
          <p>{inputTitle}</p>
          <div className={styles.input_container}>
            <input
              style={{ width }}
              className={`${value ? styles.active_input : styles.default_input} ${isValid ? '' : styles.error_input}`}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              type={inputType}
            />
            {isSearchInput && (
            <div className={styles.searchIcon_container}>
              <img src={searchIcon} alt="Search Icon" className={styles.searchIcon} />
            </div>
            )}
          </div>
          
          {isValid ? "" : <h3 id={styles.error_text}>{errorText}</h3>}
        </div>
      );
}