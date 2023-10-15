export const SaveEmailForSubscribe = (email: string) => {
    localStorage.setItem("SubscribeEmail", JSON.stringify(email));
}