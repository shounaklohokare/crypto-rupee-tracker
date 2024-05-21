import { useEffect, useState } from "react"
import axios, { AxiosResponse } from 'axios';
import { API_ID, API_KEY } from "./constants/api_details";
import { Ticker } from "ccxt";
// import res from './data.json';

interface CryptoData extends Ticker {
    priceInInr : number
}

const App = () => {

    const headers = {
        'x-api-key': API_KEY
    }

    const [cryptoData, setCryptoData] = useState<CryptoData[]>()

    const getCryptoData = async () => {
        try {

            const res : AxiosResponse = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-crypto-price`, {headers: headers});

            setCryptoData(res?.data as CryptoData[]);
    

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
                <div className="pt-[8rem]">
                    <table className="border-2 mx-auto mb-[4rem] border-black">
                        <thead>
                            <tr>
                                <th className="tbl-i-h">Symbol</th>
                                <th className="tbl-i-h">Price</th>
                                <th className="tbl-i-h">Change</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            
                            {cryptoData?.map((dataItem) => ( <tr><td className="tbl-i-b">{dataItem.symbol}</td> <td className="tbl-i-b">{dataItem.priceInInr}</td><td className="tbl-i-b">{dataItem.info?.priceChangePercent}%</td></tr>  ))   } 
                            
                        </tbody>
                    </table>
                </div>
            </div>

}

export default App
