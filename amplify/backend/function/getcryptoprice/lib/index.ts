import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as ccxt from 'ccxt';
import { Tickers, Ticker } from 'ccxt';
import * as CurrencyConverter from 'currency-converter-lt'

interface CryptoData extends Ticker {
    priceInInr : number
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

const getCryptoData = async (usdInrRate : number) : Promise<CryptoData[] | string>  => {

  try {

      const exchange = new ccxt.binance();

      await exchange.loadMarkets();
      
      const usdtMarkets : string[] = exchange.symbols.filter(symbol => symbol.endsWith('/USDT'));

      const TickersArray : Tickers = await exchange.fetchTickers(usdtMarkets.splice(0, 50));

      const cryptoData : CryptoData[] = []
      for(const ticker in TickersArray){

          const priceInInr : number = (TickersArray[ticker]?.last ?? 0) * usdInrRate;

          const obj : CryptoData = {
              ...TickersArray[ticker],
              priceInInr
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