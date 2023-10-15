export const saveResetUser = (username: string) => {
    localStorage.setItem('resetUser', JSON.stringify(username));
}
export const saveNewPasswordByResetUserLS = (newPassword: string) => {
    const userDataFromLS = localStorage.getItem("Users");
    const resetUsernameDataFromLS = localStorage.getItem('resetUser');
    if (userDataFromLS && resetUsernameDataFromLS) {
        const usersArr = JSON.parse(userDataFromLS);
        const resetUser = JSON.parse(resetUsernameDataFromLS);
        if (usersArr.length === 1) {
            const userObject = usersArr[0];
            if (resetUser in userObject) {
                userObject[resetUser].password = newPassword;
                localStorage.setItem("Users", JSON.stringify(usersArr));
                return true;
            }
        } else {
            for (let userObject of usersArr) {
                for (let key in userObject) {
                    if (key === resetUser) {                    
                        userObject[resetUser].password = newPassword;
                        localStorage.setItem("Users", JSON.stringify(usersArr));
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

