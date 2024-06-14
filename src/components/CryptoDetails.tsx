import { FC, useContext } from "react";
import { useParams } from "react-router-dom"
import CryptoSvgIcon from "./CryptoSvgIcon";
import { CryptoData } from "../utils/constants";
import CryptoDataContext from "../utils/CryptoDataContext";
import { roundDown, formatNum, formatDate } from "../utils/utils";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';


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
                        <Ltp price={symbolDetails.price_in_rupees} percent_change={symbolDetails.price_change_percentage_24h} />
                        <CryptoStat property={"Circulating Supply"} value={formatNum(symbolDetails.circulating_supply)}/>
                        <CryptoStat property={"All Time High"} value={`₹${formatNum(roundDown(symbolDetails.ath, 2))}`}/>
                        <CryptoStat property={"All Time High Change"} value={`${roundDown(symbolDetails.ath_change_percentage, 2)}%`}/>
                        <CryptoStat property={"All Time High Date"} value={formatDate(symbolDetails.ath_date)}/>
                        <CryptoStat property={"Market Cap"} value={`₹${formatNum(symbolDetails.market_cap)}`}/>
                        <CryptoStat property={"Market Cap Rank"} value={symbolDetails.market_cap_rank}/>
                </div>
                
            </div>
        
        </div>


}

interface LtpProps {
    price : number
    percent_change :number
}

const Ltp:FC<LtpProps> = ({price, percent_change}) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const seperator = isMobile ? '' : ': ';

    return  <h1 className="crypto-stat "><span className="font-semibold mr-1">{`Current Price${seperator}`}</span><div className="flex md:m-0  ml-6">₹{roundDown(price, 2)} <h3 className={`text-[1rem] ml-1 font-semibold flex ${percent_change >= 0 ? `text-green-500` : 'text-red-500'}`}>{roundDown(percent_change, 2)}% {percent_change >= 0 ? <MdArrowDropUp size={28}/> : <MdArrowDropDown size={28}/> }</h3></div></h1>
}

interface CryptoStatProps {
    property : string
    value : string | number
}

const CryptoStat:FC<CryptoStatProps> = ({property, value}) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const seperator = isMobile ? '' : ': ';

    return <h1 className="crypto-stat"><span className="font-semibold mr-1">{property + seperator}</span><span>{value}</span></h1>

}

export default CryptoDetails;