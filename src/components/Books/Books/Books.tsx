import { useEffect, useState } from "react";
import { BookState} from "../../../redux/books/books.ts";
import { BookCard } from "../BookCard/bookcard.tsx";
import styles from "./Books.module.scss"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { createPaginationRelBooksObject } from "../../Pagination/pagination.tsx";

interface BooksProps{
    booksArr: BookState[];
}

export const Books = ({ booksArr} : BooksProps) => {  
    const [searchParams, setSearchParams] = useSearchParams("");  
    console.log(booksArr);
    const navigate = useNavigate(); 
    const [paginated, setPaginated] = useState<{ [key: string]: BookState[] }>({})

    useEffect(() => { 
        console.log(booksArr);   
        const paginatedBoo = createPaginationRelBooksObject(booksArr);
        setPaginated(paginatedBoo);
        console.log("paginatedBoo");
    }, []);

    const redirectToPostPage = (id: number) => {
        navigate(`/books/${id}`);
    };

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
    
    return (
        <div className={styles.books_content_container}>
            {selectedArray ? selectedArray.map((book: BookState) => (
                <div key={book.isbn13}>
                    <BookCard book={book} onClick={() => redirectToPostPage(Number(book.isbn13))}/>
                </div>
            )) : null}
        </div>
    );
}
