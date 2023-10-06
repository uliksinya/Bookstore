import { useEffect, useState, useMemo } from "react";
import { BookState} from "../../../redux/books/books.ts";
import { BookCard } from "../BookCard/Bookcard.tsx";
import styles from "./Books.module.scss"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { createPaginationRelBooksObject } from "../../Pagination/Pagination.tsx";
import {selectReleasedBooks} from "../../../redux/books/books.ts";
import { useAppSelector } from "../../../redux/hooks.ts";

interface BooksProps{
    booksArr: BookState[];
}

export const Books = ({ booksArr} : BooksProps) => {  
    const [searchParams, setSearchParams] = useSearchParams("");  
    console.log(booksArr);
    const navigate = useNavigate();    

    const redirectToPostPage = (id: number) => {
        navigate(`/books/${id}`);
    };

    return (
        <div className={styles.books_content_container}>
            {booksArr.map((book: BookState) => (
                <div key={book.isbn13}>
                    <BookCard book={book} onClick={() => redirectToPostPage(Number(book.isbn13))}/>                   
                </div>
            ))}
        </div>
    );
}
/*
    const [paginated, setPaginated] = useState<{ [key: string]: BookState[] }>({})

    useEffect(() => { 
        console.log(booksArr);   
        const paginatedBoo = createPaginationRelBooksObject(booksArr);
        setPaginated(paginatedBoo);
        console.log("paginatedBoo");
    }, []);

    const findCurrentPage = () => {
        const currentPageFromParams = searchParams.get("page");
        if (currentPageFromParams) {
            return currentPageFromParams;
        } else {
            return 1;
        }
    };
    const currPageString = findCurrentPage().toString()
    const selectedArray = paginated[currPageString]; 
    */     
    