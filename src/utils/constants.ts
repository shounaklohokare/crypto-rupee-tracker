export const COINS_PER_PAGE = 10;

interface CoinGeckoResponseData {
    id : string
    symbol : string
    name : string
    image : string
    current_price : number
    market_cap : number
    market_cap_rank : number
    fully_diluted_valuation : number | null
    total_volume : number
    high_24h : number
    low_24h : number
    price_change_24h : number
    price_change_percentage_24h : number
    market_cap_change_24h : number
    circulating_supply : number
    total_supply : number | null
    max_supply : number | null
    ath_change_percentage : number
    ath : number
    ath_date : string
    roi :  null | number | unknown
    last_updated : string
}

export interface CryptoData extends CoinGeckoResponseData {
    price_in_rupees : number
}

export interface TableRowProps {
    name : string
    image : string
    symbol : string
    price : number
    percentChange : number
}

export interface SvgIconProps{
    symbol : string
    image : string
    size : string
}

export interface CryptoNameProps{
    name : string
}


export interface PaginationProps {
    totalCoins : number
    setCurrentPage : (arg0:number)=> void
    currentPage : number
}