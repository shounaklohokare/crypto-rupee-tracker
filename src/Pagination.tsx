import { FC } from "react";
import { COINS_PER_PAGE } from './constants/constants'

interface PaginationProps {
    totalCoins : number
    setCurrentPage : (arg0:number)=> void
}

const Pagination:FC<PaginationProps> = ({totalCoins, setCurrentPage}) => {

    const pages = [];

    for(let i=1; i<= Math.ceil(totalCoins/COINS_PER_PAGE); i++){
        pages.push(i);
    }

    return <div className="flex space-x-3 py-4 my-4 justify-center">
        {
            pages.map((page, index) => {
                return <button key={index} className="p-2 border border-violet-400" onClick={() => {setCurrentPage(page) }}>{page}</button>
            })
        }
    </div>


}

export default Pagination;