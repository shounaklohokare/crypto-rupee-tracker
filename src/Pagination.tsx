import { FC } from "react";
import { COINS_PER_PAGE } from './constants/constants'


interface PaginationProps {
    totalCoins : number
    setCurrentPage : (arg0:number)=> void
    currentPage : number
}

const Pagination:FC<PaginationProps> = ({totalCoins, setCurrentPage, currentPage}) => {

    const pages = [];

    for(let i=1; i<= Math.ceil(totalCoins/COINS_PER_PAGE); i++){
        pages.push(i);
    }

    return <div className="pagination-cont">
        {
            pages.map((page, index) => {
            return <button key={index} className={`page-button ${page === currentPage ? 'bg-slate-100 border-2 underline border-slate-950 italic' : ''} `} onClick={() => {setCurrentPage(page) }}>{page}</button>
            })
        }
    </div>


}

export default Pagination;