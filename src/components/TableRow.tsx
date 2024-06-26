import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CryptoNameProps,  TableRowProps } from "../utils/constants";
import { formatNum, roundDown } from "../utils/utils";
import CryptoSvgIcon from "./CryptoSvgIcon";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

const TableRow:FC<TableRowProps> = ({symbol, image, name, price, percentChange}) => {

    const navigate = useNavigate();

    return <tr className="tbl-row hover:shadow-gray-1/50 hover:shadow-gray-300/100" onClick={()=> { navigate(`/crypto/${symbol}`)}}>
                <td className="symbol-col">
                    <div className="symbol-cont">
                        <div><CryptoSvgIcon symbol={`${symbol}`} image={image} size='M' /></div>
                        <CryptoName name={name}/>
                    </div>
                </td> 
                <td className="tbl-body-elem">₹{price < 0 ? price : formatNum(price)}</td>
                <td className={`tbl-body-elem ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{roundDown(percentChange)}%</td>
                <td className=""><LiaExternalLinkAltSolid color="black" className="md:text-[2rem] text-[1.625rem]" /></td>
            </tr>  

}


const CryptoName:FC<CryptoNameProps> = ({name}) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return <div className={`crypto-name ${isMobile && name.length > 11 ? 'truncate w-[6.5rem] hover:w-[14rem] hover:bg-slate-100' : name.length > 17 ? 'truncate w-[12rem] hover:w-[15rem] hover:bg-slate-100' : ''}`}>{name}</div>

}



 
export default TableRow;
