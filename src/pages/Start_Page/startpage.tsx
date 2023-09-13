import React, { useEffect } from "react";
import axios from "axios";
import { ReleasedBooks } from "../../components/Books/ReleasedBooks/releasedbooks";
import { useAppDispatch } from "../../redux/hooks";

export const StartPage = () => {
  

    // useEffect(() => {
    //      (async () => {
    //         try {
    //             const response = await axios.get("https://api.itbook.store/1.0/new");
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //       })();
    // }, []);

    return (
        <div>
            <h1>New Releases Books</h1>
            <ReleasedBooks/>
        </div>
    );
};
