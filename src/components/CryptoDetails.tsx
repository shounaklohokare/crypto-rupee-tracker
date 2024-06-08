import { FC, useContext } from "react";
import { useParams } from "react-router-dom"
import CryptoSvgIcon from "./CryptoSvgIcon";
import { CryptoData } from "../utils/constants";
import CryptoDataContext from "../utils/CryptoDataContext";
import { roundDown, formatNum, formatDate } from "../utils/utils";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";



const CryptoDetails:FC = () => {

    const { cryptoSymbol } = useParams()

    const cryptoData : CryptoData[]  =  useContext(CryptoDataContext)

    const symbolDetails : CryptoData | undefined = cryptoData?.find((e) => e.symbol == cryptoSymbol) 

    if (symbolDetails == undefined) {
        return <h1>Error</h1>
    }

    return <div className="crypto-details-cont">
        
            <div className="crypto-details-div">
                <div className="crypto-details-header-cont">
                        <CryptoSvgIcon symbol={symbolDetails.symbol} image={symbolDetails.image} size='L'/>
                        <h1 className="crypto-details-header">{symbolDetails.name}</h1>
                </div>
                <div className="details-cont">
                    <div className="details-inner-cont">
                        <Ltp price={symbolDetails.price_in_rupees} percent_change={symbolDetails.price_change_percentage_24h} />
                        <h1 className="crypto-stat"><span className="font-semibold md:pr-[0.3rem]">Circulating Supply</span><span>{formatNum(symbolDetails.circulating_supply)}</span></h1>
                        <h1 className="crypto-stat"><span className="font-semibold md:pr-[0.3rem]">All Time High</span><span>₹{formatNum(roundDown(symbolDetails.ath, 2))}</span></h1>
                        <h1 className="crypto-stat"><span className="font-semibold md:pr-[0.3rem]">All Time High Change</span><span>{roundDown(symbolDetails.ath_change_percentage, 2)}%</span></h1>
                        <h1 className="crypto-stat"><span className="font-semibold md:pr-[0.3rem]">All Time High Date</span><span>{formatDate(symbolDetails.ath_date)}</span></h1>
                        <h1 className="crypto-stat"><span className="font-semibold md:pr-[0.3rem]">Market Cap</span><span>₹{formatNum(symbolDetails.market_cap)}</span></h1>
                        <h1 className="crypto-stat"><span className="font-semibold md:pr-[0.3rem]">Market Cap Rank</span><span>{symbolDetails.market_cap_rank}</span></h1>
                    </div>
                    {/* price_in_rupees price_change_percentage_24h  */}
                    
                </div>
                
            </div>
        
        </div>


}

interface LtpProps {
    price : number
    percent_change :number
}

const Ltp:FC<LtpProps> = ({price, percent_change}) => {
    return  <h1 className="ltp-cont"><span className="font-semibold">LTP</span>: ₹{roundDown(price, 2)} <h3 className={`text-[1rem] px-1 font-semibold my-auto flex ${percent_change >= 0 ? `text-green-500` : 'text-red-500'}`}>{roundDown(percent_change, 2)}% {percent_change >= 0 ? <MdArrowDropUp size={28}/> : <MdArrowDropDown size={28}/> }</h3></h1>
}

export default CryptoDetails;