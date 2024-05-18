import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as ccxt from 'ccxt';
import { Ticker } from 'ccxt';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const exchange = new ccxt.binance();

    const symbols: string[] = ['BTC/USDT', 'ETH/USDT', 'DOGE/USDT'];
    console.log(symbols)

    try {
        const tickerData: Ticker[] = []
    
        for(const symbol of symbols){
            console.log(symbol)
            tickerData.push(await exchange.fetchTicker(symbol))
        }
        
        
        return {
            statusCode: 200,
             headers: {
                 "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Headers": "*"
             },
            body: JSON.stringify(tickerData),
        };
        
      } catch (error) {
         return {
            statusCode: 200,
             headers: {
                 "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Headers": "*"
             },
            body: JSON.stringify(`Error :- ${error}`),
        };
    }


};