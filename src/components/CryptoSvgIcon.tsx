import { FC, useState, useEffect } from "react";
import { SvgIconProps } from "../utils/constants";

const CryptoSvgIcon:FC<SvgIconProps> = ({symbol, image, size}) => {
  
    const [cryptoIcon, setCryptoIcon] = useState("");

    useEffect(() => {
        setCryptoIcon(`${`https://cryptofonts.com/img/icons/${symbol}.svg`}`)
    }, [symbol])


    const handleError = () => {
        setCryptoIcon(image)
    }

    return  <img src={cryptoIcon} onError={handleError} className={`${size === 'L' ? 'crypto-icon-lg' : 'crypto-icon'}`} key={cryptoIcon}/>

}

export default CryptoSvgIcon;