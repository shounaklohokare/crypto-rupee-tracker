import { FC, useState } from "react"

interface TableRowProps {
    name : string
    image : string
    symbol : string
    price : number
    percentChange : number
}

const TableRow:FC<TableRowProps> = ({symbol, image, name, price, percentChange}) => {

    const roundDown = (num : number, decimalPlaces : number) =>{
        const factor = Math.pow(10, decimalPlaces);
        return Math.floor(num * factor) / factor;
    }

    const formatPrice = (num : number) => {

        if(num > 10000000){
            const x = num/10000000;
            return roundDown(x, 2) + " Crores";
        }else if(num > 100000){
            const x = num/100000;
            return roundDown(x, 2) + " Lakhs"
        }

        return roundDown(num, 4)

    }


    return <tr>
                
                <td className="px-[4rem] flex">
                    <div className="flex ml-[4.125rem] items-center justify-self-auto md:space-x-5 space-x-2">
                        <div><SvgIcon symbol={`${symbol}`} image={image} /></div>
                        <div className="md:pt-[0.375rem]">{name}</div>
                    </div>
                </td> 
                <td className="tbl-i-b">₹{price < 0 ? price : formatPrice(price)}</td>
                <td className={`tbl-i-b ${price >= 0 ? 'text-green-500' : 'text-red-500'}`}>{roundDown(percentChange,2)}%</td>
            </tr>  

}




interface SvgIconProp{
    symbol : string
    image : string
}

const SvgIcon:FC<SvgIconProp> = ({symbol, image}) => {
    
    
    const [cryptoIcon, setCryptoIcon] = useState(`${`https://cryptofonts.com/img/icons/${symbol}.svg`}`);

    

    const handleError = () => {
        setCryptoIcon(image)
    }

    return <img src={cryptoIcon} onError={handleError} className="h-6 mt-[0.2rem] md:h-10"/> 

}

 
export default TableRow;