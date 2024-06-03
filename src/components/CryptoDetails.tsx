import { FC, useContext } from "react";
import { useParams } from "react-router-dom"
import CryptoSvgIcon from "./CryptoSvgIcon";
import { CryptoData } from "../utils/constants";
import CryptoDataContext from "../utils/CryptoDataContext";


const CryptoDetails:FC = () => {

    const { cryptoSymbol } = useParams()

    const cryptoData : CryptoData[]  =  useContext(CryptoDataContext)

    const symbolDetails : CryptoData  = cryptoData?.find((e) => e.symbol == cryptoSymbol) 

    return <div className="main-div md:h-[calc(100vh-3rem)] min-h-[calc(100vh-8vh)]">
        
            <div className="mt-[4.5rem] md:mt-[6.69rem] md:ml-[2rem] mr-6 flex justify-center md:justify-left">
                <div className="flex m-5 p-5 md:space-x-12 space-x-4">
                    <CryptoSvgIcon symbol={symbolDetails.symbol} image={symbolDetails.image} size='L'/>
                    <h1 className="text-3xl md:text-5xl mt-[0.35rem] font-mono">{symbolDetails.name}</h1>
                </div>
                
            </div>
        
        </div>


}

export default CryptoDetails;