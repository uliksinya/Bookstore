import {favBookType} from "../../api/types";

export const isThisBookInFavLS = (isbn: string): boolean => {
    const favBooksFromLS = localStorage.getItem('favBooks');
    if (favBooksFromLS) {
        const favBooks = JSON.parse(favBooksFromLS);
        return favBooks.some((book: favBookType) => book.isbn13 === isbn);
    }
    return false;
}
export const getBooksFromLS = () => {
    const favBooksFromLS = localStorage.getItem('favBooks');
    const favBooks = favBooksFromLS ? JSON.parse(favBooksFromLS) : [];
    return favBooks;
}
export const addFavBookToLS = (isbn: string, favBookObj : favBookType) => {
    const favBooksFromLS = localStorage.getItem('favBooks');
    const favBooks = favBooksFromLS ? JSON.parse(favBooksFromLS) : [];
    if (!favBooks.some((book : favBookType)=> book.isbn13 === isbn)) {
        favBooks.push(favBookObj);
        localStorage.setItem('favBooks', JSON.stringify(favBooks));
    }
}
export const removeFavBookFromLS = (removeIsbn: string) => {
    const favBooksFromLS = localStorage.getItem('favBooks');
    const favBooks = favBooksFromLS ? JSON.parse(favBooksFromLS) : [];
    const updatedFavBooks = favBooks.filter((book : favBookType) => book.isbn13 !== removeIsbn);
    localStorage.setItem('favBooks', JSON.stringify(updatedFavBooks));
}


