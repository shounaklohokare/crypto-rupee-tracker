import { FC } from "react"

interface TableRowProps {
    symbol : string
    price : number
    percentChange : number
}

const TableRow:FC<TableRowProps> = ({symbol, price, percentChange}) => {

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
                
                <td className="tbl-i-b">
                    <div className="flex md:space-x-5 space-x-2 pl-[0.0rem]">
                        <div><SvgIcon ticker={`${symbol.split('/')[0]}`} /></div>
                        <div className="md:pt-[0.375rem]">{symbol}</div>
                    </div>
                </td> 
                <td className="tbl-i-b">₹{price < 0 ? price : formatPrice(price)}</td>
                <td className={`tbl-i-b ${price >= 0 ? 'text-green-500' : 'text-red-500'}`}>{roundDown(percentChange,2)}%</td>
            </tr>  

}


interface SvgIconProp{
    ticker : string
}

const SvgIcon:FC<SvgIconProp> = ({ticker}) => <img src={`${`https://cryptofonts.com/img/icons/${ticker.toLowerCase()}.svg`}`} className="h-5 md:h-10"/> 

 
export default TableRow;