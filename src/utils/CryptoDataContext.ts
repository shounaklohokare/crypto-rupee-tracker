import { createContext } from "react";
import { CryptoData } from "./constants";

const CryptoDataContext = createContext<CryptoData[] | []>([])

export default CryptoDataContext;