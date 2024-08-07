import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CryptoNameProps,  TableRowProps } from "../utils/constants";
import { formatNum, roundDownPercent } from "../utils/utils";
import CryptoSvgIcon from "./CryptoSvgIcon";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

const TableRow:FC<TableRowProps> = ({symbol, image, name, price, percentChange}) => {

    const navigate = useNavigate();

    return <tr className="tbl-row hover:shadow-gray-1/50 hover:shadow-gray-300/100" onClick={()=> { navigate(`/crypto/${symbol}`)}}>
                <td className="absolute">
                    <div className="symbol-cont">
                        <div><CryptoSvgIcon symbol={`${symbol}`} image={image} size='M' /></div>
                        <CryptoName name={name}/>
                    </div>
                </td> 
                <td className="py-[0.75rem]  sm:tracking-tighter md:text-xl">₹{price < 0 ? price : formatNum(price)}</td>
                <td className="absolute">
                    <div className="percent-cont">
                        <div className={`md:w-[4.5rem] w-16 py-[0.65rem] text-center md:text-xl ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{roundDownPercent(percentChange)}%</div>
                        <div className={`md:text-3xl text-2xl text-gray-900`}><LiaExternalLinkAltSolid/></div>
                    </div>
                </td> 
            </tr>  

}


const CryptoName:FC<CryptoNameProps> = ({name}) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return <div className={`crypto-name ${isMobile && name.length > 11 ? 'truncate w-[6.5rem] hover:w-[14rem] hover:bg-slate-100' : name.length > 17 ? 'truncate w-[12rem] hover:w-[15rem] hover:bg-slate-100' : ''}`}>{name}</div>

}



 
export default TableRow;
