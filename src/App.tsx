import { useEffect, useState } from "react"
import axios, { AxiosResponse } from 'axios';
import { API_ID, API_KEY } from "./constants/api_details";
import { Ticker } from "ccxt";

interface CryptoData extends Ticker {
    priceInInr : number
}

const App = () => {

    const headers = {
        'x-api-key': API_KEY
    }

    const [cryptoData, setCryptoData] = useState<string | CryptoData>()

    const getCryptoData = async () => {
        try {

            const res : AxiosResponse = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-crypto-price`, {headers: headers});
            console.log(res)

            setCryptoData(res?.data);
            console.log(cryptoData)

         }catch (error) {
        
            console.error('Error fetching data:', error);
        }
    }


    useEffect(()=> {
        getCryptoData()

    }, [])

    return <div className="main-div">
                <div className="navbar">
                    <h1 className="header">Crypto Rupee Tracker</h1>
                </div>
            </div>

}

export default App
