export const addFavBookToLS = (isbn: string) => {
    const favBooksFromLS = localStorage.getItem('favBooks');
    const favBooks = favBooksFromLS 
    ? 
    JSON.parse(favBooksFromLS) 
    : 
    [];
        if (!favBooks.includes(isbn)) {
            favBooks.push(isbn);
            localStorage.setItem('favBooks', JSON.stringify(favBooks));
        }
}
export const removeFavBookFromLS = (removeIsbn: string) => {
    const favBooksFromLS = localStorage.getItem('favBooks');
    if(favBooksFromLS){
        const favBooks = JSON.parse(favBooksFromLS);
        const updatedFavBooks = favBooks.filter((id: string) => id !== removeIsbn);
        console.log(updatedFavBooks);
        localStorage.setItem('favBooks', JSON.stringify(updatedFavBooks));
    }
}
export const isThisBookInFavLS = (isbn: string) => {
    const favBooksFromLS = localStorage.getItem('favBooks');
    return favBooksFromLS ? JSON.parse(favBooksFromLS).includes(isbn) : false;
}

