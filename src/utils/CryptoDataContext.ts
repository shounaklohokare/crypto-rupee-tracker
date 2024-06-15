import { createContext } from "react";
import { CryptoData } from "./constants";


interface CryptoDataContextProps{
    cryptoData : CryptoData[] | []
    loading : boolean
}

const CryptoDataContext = createContext<CryptoDataContextProps>({cryptoData : [], loading : true})

export default CryptoDataContext;