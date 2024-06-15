import { useState } from "react"
import { COINS_PER_PAGE} from "../utils/constants";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import CryptoDataContext from "../utils/CryptoDataContext";
import { useContext } from "react";
import TableHeader from "./TableHeader";
import Shimmer from "./Shimmer";

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const {cryptoData, loading}  = useContext(CryptoDataContext)

    if (loading) {
        return <Shimmer/>
    }

    const lastCoinIdx = currentPage * COINS_PER_PAGE;
    const firstCoinIdx = lastCoinIdx - COINS_PER_PAGE;
    const coinsOnPage = cryptoData?.slice(firstCoinIdx, lastCoinIdx);

    return <div className="main-div md:h-[calc(100vh-3rem)] min-h-[calc(100vh-8vh)]">
                <div className="table-div">
                    <table className="tbl">
                        <TableHeader/>
                        <tbody className="table-body">
                            {coinsOnPage?.map((dataItem) => ( <TableRow symbol={dataItem.symbol} key={dataItem.name} image={dataItem.image} name={dataItem.name} price={dataItem.price_in_rupees} percentChange ={dataItem.price_change_percentage_24h}/>  ))   } 
                        </tbody>
                    </table>
                    <Pagination totalCoins={cryptoData?.length ?? 0} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
            </div>

}

export default Home;
