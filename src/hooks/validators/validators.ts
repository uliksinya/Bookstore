import { isThisUserInLS, isThisEmailInLS } from "../localStorage/localstorage";

export function emailValidator(email: string): string | true {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(isThisEmailInLS(email)){
      return 'Такой email уже существует';
    }

    if (!emailRegex.test(email)) {
      return 'Введите действительный email-адрес';
    } 
    return true; 
    
}

export function passwordValidator(password: string): string | true {
    // Проверяем, что пароль имеет как минимум 8 символов
    if (password.length < 8) {
      return 'Пароль должен содержать как минимум 8 символов';
    }
  
    // Проверяем, что пароль содержит хотя бы одну букву в верхнем регистре
    if (!/[A-Z]/.test(password)) {
      return 'Пароль должен содержать хотя бы одну заглавную букву';
    }
  
    // Проверяем, что пароль содержит хотя бы одну букву в нижнем регистре
    if (!/[a-z]/.test(password)) {
      return 'Пароль должен содержать хотя бы одну строчную букву';
    }
  
    // Проверяем, что пароль содержит хотя бы одну цифру
    if (!/\d/.test(password)) {
      return 'Пароль должен содержать хотя бы одну цифру';
    }

    return true; 
}
export function confirmPasswordValidator(password: string, confirmPassword: string): string | true {
    if (password !== confirmPassword) {
      return 'Пароли не совпадают';
    }  
    return true; // Возвращаем true, если пароли совпадают
}

export function usernameValidator(username: string) : string | true {
  if(isThisUserInLS(username)){
    return 'Такое имя пользователя уже существует';
  }
  return true;
}

  
  
