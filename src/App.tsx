import { useEffect, useState } from "react"
// import axios, { AxiosResponse } from 'axios';
// import { API_ID, API_KEY } from "./constants/api_details";
import { Ticker } from "ccxt";
import res from './data.json';
import TableRow from "./TableRow";

interface CryptoData extends Ticker {
    priceInInr : number
}

const App = () => {

    // const headers = {
    //     'x-api-key': API_KEY
    // }

    const [cryptoData, setCryptoData] = useState<CryptoData[]>()

    const getCryptoData = async () => {
        try {

            // const res : AxiosResponse = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-crypto-price`, {headers: headers});

            // console.log(res?.data)

            setCryptoData(res as CryptoData[]);

    

         }catch (error) {
        
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=> {
        getCryptoData()
        console.log(cryptoData)
    }, [])

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
                            
                            {cryptoData?.map((dataItem) => ( <TableRow symbol={dataItem.symbol} price={dataItem.priceInInr} percentChange ={dataItem.info.priceChangePercent as number}/>  ))   } 
                            
                        </tbody>
                    </table>

                </div>
            </div>

}

export default App
