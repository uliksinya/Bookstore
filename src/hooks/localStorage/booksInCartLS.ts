import {favBookType} from "../../api/types";

export const addBookToCartInLS = (isbn: string, bookObj : favBookType) => {
    const booksInCart = localStorage.getItem('BookCart');
    const favBooks = booksInCart ? JSON.parse(booksInCart) : [];
    if (!favBooks.some((book : favBookType)=> book.isbn13 === isbn)) {
        favBooks.push(bookObj);
        localStorage.setItem('BookCart', JSON.stringify(favBooks));
    }
}
export const removeBookFromCartInLS = (removeIsbn: string) => {
    const booksInCart = localStorage.getItem('BookCart');
    const favBooks = booksInCart ? JSON.parse(booksInCart) : [];
    const updatedFavBooks = favBooks.filter((book : favBookType) => book.isbn13 !== removeIsbn);
    localStorage.setItem('BookCart', JSON.stringify(updatedFavBooks));
}
export const getBooksFromCartInLS = () => {
    const booksInCart = localStorage.getItem('BookCart');
    const books = booksInCart ? JSON.parse(booksInCart) : [];
    return books;
}
export const updatePriceInLS = (isbn: string, newPrice: string): boolean => {
    const booksInCart = localStorage.getItem('BookCart');

    if (booksInCart) {
        const favBooks = JSON.parse(booksInCart);

        const updatedFavBooks = favBooks.map((book: favBookType) => {
            if (book.isbn13 === isbn) {

                book.price = newPrice.toString() ;

                return { ...book, price: newPrice.toString() }; 
            }
            return book;
        });

        localStorage.setItem('BookCart', JSON.stringify(updatedFavBooks)); 

        return true;
    }
    return false;
}
export const updateQuantityInLS = (isbn: string, count: number): boolean => {
    const booksInCart = localStorage.getItem('BookCart');

    if (booksInCart) {
        const favBooks = JSON.parse(booksInCart);

        const updatedFavBooks = favBooks.map((book: favBookType) => {
            if (book.isbn13 === isbn) {
            
                book.quantity = count ;

                return { ...book, quantity:  count};
            }
            return book;
        });

        localStorage.setItem('BookCart', JSON.stringify(updatedFavBooks));

        return true;
    }
    return false;
}