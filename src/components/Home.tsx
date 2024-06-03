import { useState } from "react"
import { COINS_PER_PAGE, CryptoData } from "../utils/constants";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import CryptoDataContext from "../utils/CryptoDataContext";
import { useContext } from "react";

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const cryptoData : CryptoData[] = useContext(CryptoDataContext)
    
    const lastCoinIdx = currentPage * COINS_PER_PAGE;
    const firstCoinIdx = lastCoinIdx - COINS_PER_PAGE;
    const coinsOnPage = cryptoData?.slice(firstCoinIdx, lastCoinIdx);

    return <div className="main-div md:h-[calc(100vh-3rem)] min-h-[calc(100vh-8vh)]">
                <div className="table-div">
                    <table className="tbl">
                        <thead>
                            <tr>
                                <th className="tbl-head-elem">Name</th>
                                <th className="tbl-head-elem">Price</th>
                                <th className="tbl-head-elem">Change</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {coinsOnPage?.map((dataItem) => ( <TableRow symbol={dataItem.symbol} key={dataItem.name} image={dataItem.image} name={dataItem.name} price={dataItem.price_in_rupees} percentChange ={dataItem.price_change_percentage_24h}/>  ))   } 
                        </tbody>
                    </table>
                    <Pagination totalCoins={cryptoData?.length ?? 0} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
            </div>

}

export default Home;
