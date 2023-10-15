import { favBookType } from "../../types/types";

export function parsePriceToNumber(price: string){
    const newStr = price.replace('$', '');
    const numbStr = Number(newStr);
    return numbStr;
}
export function getRandomNum(max: number){
    return Math.floor(Math.random() * max);
}
export function generateNumbersArrByLimit(limit: number, currentPageNumber: number){
    const numbersArray: number[] = [];
        for (let i = 1; i <= limit; i++) {            
            numbersArray.push(i);
        }
        if(limit <= 7) return numbersArray;
        const startControlPoint = 4;
        const endControlPoint = limit - 4;
        if(currentPageNumber >= startControlPoint && currentPageNumber <= endControlPoint){
            const newArray: number[] = [1, 0];
            const resultArray: number[] = newArray.concat(numbersArray.slice(currentPageNumber - 2, currentPageNumber + 1));
            return resultArray.concat([0, limit]);
        }else if(currentPageNumber < startControlPoint) {
            const newArray: number[] = numbersArray.slice(0, startControlPoint);
            return newArray.concat([0, limit]);
        }else{
            return [1,0].concat(numbersArray.slice(endControlPoint-2, limit));
        }
};
export const getSumTotal = (books: favBookType[]) => {
    const totalSumPrice = books.reduce((total, book) => total + Number(book.price), 0);
    return totalSumPrice;
}
export const getVatSum = (sum: number) => {
    return sum * 0.2;
}

