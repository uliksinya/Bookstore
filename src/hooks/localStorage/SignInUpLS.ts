interface registrationProps{
    username: string;
    email: string;
    password: string;
}

export const registerUser = ({username, email, password} : registrationProps): boolean => {
        const dataFromLS = localStorage.getItem("Users");
        const usersArr = dataFromLS ? JSON.parse(dataFromLS) : [];
        usersArr.push({ [username]: { email, password } });
        localStorage.setItem("Users", JSON.stringify(usersArr));
    return true;
}

export const isThisUserInLS = (username: string): boolean => {
    const dataFromLS = localStorage.getItem("Users");
    if(dataFromLS){
        const usersArr = dataFromLS ? JSON.parse(dataFromLS) : [];
            for(let userObject of usersArr){
                for(let key in userObject){
                    if(key === username){
                        return true;
                    }
                }
            }
    }
    return false;
}

export const confirmPassword = (username: string, password: string): boolean => {
    const dataFromLS = localStorage.getItem("Users");
    if (dataFromLS) {
        const usersArr = JSON.parse(dataFromLS);
        for (let userObject of usersArr) {
            for (let key in userObject) {
                if (key === username && userObject[key].password === password) {
                    return true;
                }
            }
        }
    }
    console.log("проверка на пароль");
    return false;
}

export const isThisEmailInLS = (email: string) => {
    const dataFromLS = localStorage.getItem("Users");
    if(dataFromLS){
        const usersArr = JSON.parse(dataFromLS);
        for(let userObject of usersArr){
            for(let key in userObject){
                if(userObject[key].email === email){
                    return true;
                }
            }
        }
    }
    return false;
}
export const saveAutentificationUserInLS = (username: string) => {
        const dataFromLS = localStorage.getItem("Users");        
        if (dataFromLS) {
            const usersArr = dataFromLS ? JSON.parse(dataFromLS) : [];
            for (let userObject of usersArr) {
                for (let key in userObject) {
                    if (key === username) {
                        const AutentificationUser = { 
                            [key]: { 
                                    email: userObject[key].email, 
                                    password: userObject[key].password 
                                   }
                        };
                        localStorage.setItem("AutentificationUser", JSON.stringify(AutentificationUser));
                    }
                }
            }
        }        
}
   
export const updateAutentificationUserInLS = (newUsername: string, email:string, newPassword:string) => {
    const userFromLS = localStorage.getItem("AutentificationUser");
    const usersArrFromLS = localStorage.getItem("Users"); 

    if(userFromLS && usersArrFromLS){   
        const oldUsername =  Object.keys(JSON.parse(userFromLS))[0];   
        const usersArr = usersArrFromLS ? JSON.parse(usersArrFromLS) : [];

        for (let userObject of usersArr) {
            for (let key in userObject) {
                if (key === oldUsername) {
                    const updatedUser = {
                        [newUsername]: {
                            email: email,
                            password: newPassword
                        }
                    };
                    usersArr[usersArr.indexOf(userObject)] = updatedUser;
                    localStorage.setItem("AutentificationUser", JSON.stringify(updatedUser));
                }
            }
        }
        localStorage.setItem("Users", JSON.stringify(usersArr));
        
    }        
}

export const getAuthUsernameFromLS = (): string | null => {
    const dataFromLS = localStorage.getItem("AutentificationUser");
    if (dataFromLS !== null) {
        const userObject = JSON.parse(dataFromLS);
        const username = Object.keys(userObject)[0];
        return username;
    }
    return null;
}

export const getAuthPasswordFromLS = () => {
    const dataFromLS = localStorage.getItem("AutentificationUser");
    if (dataFromLS) {
        const userObject = JSON.parse(dataFromLS);
        const password = userObject[Object.keys(userObject)[0]].password;
        return password;
    }
    return null;
}

export const getAuthEmailFromLS = () => {
    const dataFromLS = localStorage.getItem("AutentificationUser");
    if (dataFromLS) {
        const userObject = JSON.parse(dataFromLS);
        const email = userObject[Object.keys(userObject)[0]].email;
        return email;
    }
    return null;
}

export const isAutentificationUserInLS = () => {
    const dataFromLS = localStorage.getItem("AutentificationUser");
    if (dataFromLS ) {
        return true;
    }
    return false;
}


