import { useEffect, useState } from "react"
// import axios, { AxiosResponse } from 'axios';
// import { API_ID, API_KEY } from "./constants/api_details";
import TableRow from "./TableRow";
import res from './data.json'
import Pagination from "./Pagination";
import { COINS_PER_PAGE } from "./constants/constants";

interface CoinGeckoResponseData {
    id : string
    symbol : string
    name : string
    image : string
    current_price : number
    market_cap : number
    market_cap_rank : number
    fully_diluted_valuation : number | null
    total_volume : number
    high_24h : number
    low_24h : number
    price_change_24h : number
    price_change_percentage_24h : number
    market_cap_change_24h : number
    circulating_supply : number
    total_supply : number | null
    max_supply : number | null
    ath_change_percentage : number
    ath : number
    ath_date : string
    roi :  null | number | unknown
    last_updated : string
}

interface CryptoData extends CoinGeckoResponseData {
    price_in_rupees : number
}

const App = () => {

    // const headers = {
    //     'x-api-key': API_KEY
    // }

    const [cryptoData, setCryptoData] = useState<CryptoData[]>()
    const [currentPage, setCurrentPage] = useState(3)
   

    const getCryptoData = async () => {
        try {

            // const res : AxiosResponse = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-crypto-price`, {headers: headers});

            console.log(res)

            setCryptoData(res);


         }catch (error) {
        
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=> {
        getCryptoData()
        console.log(cryptoData)
    }, [])

    
    const lastCoinIdx = currentPage * COINS_PER_PAGE;
    const firstCoinIdx = lastCoinIdx - COINS_PER_PAGE;
    const coinsOnPage = cryptoData?.slice(firstCoinIdx, lastCoinIdx);

    return <div className="main-div">
                <div className="navbar">
                    <h1 className="header">Crypto Rupee Tracker</h1>
                </div>
                <div className="table-div">
                    <table className="tbl">
                        <thead>
                            <tr>
                                <th className="tbl-i-h">Symbol</th>
                                <th className="tbl-i-h">Price</th>
                                <th className="tbl-i-h">Change</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            
                            {coinsOnPage?.map((dataItem) => ( <TableRow symbol={dataItem.symbol} image={dataItem.image} name={dataItem.name} price={dataItem.price_in_rupees} percentChange ={dataItem.price_change_percentage_24h}/>  ))   } 
                            
                        </tbody>
                    </table>
                    <Pagination totalCoins={cryptoData?.length ?? 0} setCurrentPage={setCurrentPage}/>
                </div>
            </div>

}

export default App
