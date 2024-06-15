import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from 'axios';
import * as CurrencyConverter from 'currency-converter-lt'

interface CoinGeckoResponseData {
    id : string
    symbol : string
    name : string
    image : string
    current_price : number
    market_cap : number
    market_cap_rank : number
    fully_diluted_valuation : number
    total_volume : number
    high_24h : number
    low_24h : number
    price_change_24h : number
    price_change_percentage_24h : number
    market_cap_change_24h : number
    circulating_supply : number
    total_supply : number
    max_supply : number
    ath_change_percentage : number
    ath : number
    ath_date : string
    roi : number | null
    last_updated : string
}

interface CryptoData extends CoinGeckoResponseData {
    price_in_rupees : number
    ath_in_rupees : number
    mcap_in_rupees : number
}


export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const usdInrRateResponse : number | string = await getUsdInrRate() 

    if(typeof usdInrRateResponse === "string"){
        return generateResponse(500, usdInrRateResponse);
    }
    
    const cryptoDataResponse = await getCryptoData(usdInrRateResponse);

    if(typeof cryptoDataResponse === "string"){
        return generateResponse(500, cryptoDataResponse);
    }

    return generateResponse(200, cryptoDataResponse);

};


const getUsdInrRate = async () : Promise<number | string> => {

  try{

      const currencyConverter = new CurrencyConverter({from: "USD", to: "INR", amount: 1});

      const usdRupeerate : number = await currencyConverter.convert();

      return usdRupeerate;

  }catch(error){
      return `Erorr:- ${error}` ;
  }

}
const getCryptoData = async (usdInrRate : number) : Promise<string | CryptoData[]>  => {

    try {
  
        
        const coinGeckoResponse  = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");

        const data : CoinGeckoResponseData[] = coinGeckoResponse.data;

        const cryptoData : CryptoData[] = []
        for(const responseObj of data){
           
            const price_in_rupees : number = (responseObj?.current_price ?? 0) * usdInrRate;
            const ath_in_rupees : number = (responseObj?.ath ?? 0) * usdInrRate;
            const mcap_in_rupees : number = (responseObj?.market_cap ?? 0) * usdInrRate;
  
            const obj : CryptoData = {
                ...responseObj,
                price_in_rupees,
                ath_in_rupees,
                mcap_in_rupees
            }
  
            cryptoData.push(obj)

        }
  
        return cryptoData;
  
    }catch(error){
      return `Erorr:- ${error}` ;
    }
  }


const generateResponse = (resCode : number, resBody: string | CryptoData[]) => {

    return {
      statusCode: resCode,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(resBody),
  };

}