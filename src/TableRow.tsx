import { FC, useEffect, useState } from "react"
import { CryptoNameProps, SvgIconProps, TableRowProps } from "./constants/constants";
import { formatPrice, roundDown } from "./utils/utils";
import { useMediaQuery } from 'react-responsive';

const TableRow:FC<TableRowProps> = ({symbol, image, name, price, percentChange}) => {

    return <tr>
                <td className="symbol-col">
                    <div className="symbol-cont">
                        <div><SvgIcon symbol={`${symbol}`} image={image} /></div>
                        <CryptoName name={name}/>
                    </div>
                </td> 
                <td className="tbl-body-elem">₹{price < 0 ? price : formatPrice(price)}</td>
                <td className={`tbl-body-elem ${price >= 0 ? 'text-green-500' : 'text-red-500'}`}>{roundDown(percentChange,2)}%</td>
            </tr>  

}


const CryptoName:FC<CryptoNameProps> = ({name}) => {

    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


    return <div className={`crypto-name ${isMobile && name.length > 11 ? 'truncate w-[8rem] hover:w-[14rem] hover:bg-slate-100' : ''}`}>{name}</div>


}

const SvgIcon:FC<SvgIconProps> = ({symbol, image}) => {
  
    const [cryptoIcon, setCryptoIcon] = useState("");

    useEffect(() => {
        setCryptoIcon(`${`https://cryptofonts.com/img/icons/${symbol}.svg`}`)
    }, [symbol])


    const handleError = () => {
        setCryptoIcon(image)
    }

    return  <img src={cryptoIcon} onError={handleError} className="crypto-icon" key={cryptoIcon}/>

}

 
export default TableRow;
