import { useEffect, useState } from "react"
// import axios, { AxiosResponse } from 'axios';
// import { API_ID, API_KEY } from "./constants/api_details";
import TableRow from "./TableRow";
import res from './data.json'
import Pagination from "./Pagination";
import { COINS_PER_PAGE, CryptoData  } from "./constants/constants";



const App = () => {

    // const headers = {
    //     'x-api-key': API_KEY
    // }

    const [cryptoData, setCryptoData] = useState<CryptoData[]>()
    const [currentPage, setCurrentPage] = useState(1)
   

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
                                <th className="tbl-head-elem">Symbol</th>
                                <th className="tbl-head-elem">Price</th>
                                <th className="tbl-head-elem">Change</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {coinsOnPage?.map((dataItem) => ( <TableRow symbol={dataItem.symbol} image={dataItem.image} name={dataItem.name} price={dataItem.price_in_rupees} percentChange ={dataItem.price_change_percentage_24h}/>  ))   } 
                        </tbody>
                    </table>
                    <Pagination totalCoins={cryptoData?.length ?? 0} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
            </div>

}

export default App
