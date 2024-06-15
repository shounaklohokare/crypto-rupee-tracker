import ReactDOM from 'react-dom/client'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import CryptoDetails from './components/CryptoDetails';
import Error from './components/Error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CryptoDataContext from './utils/CryptoDataContext';
import { useEffect, useState } from 'react';
import { CryptoData } from './utils/constants';
import res from './data.json'
// import axios, { AxiosResponse } from 'axios';
// import { API_ID, API_KEY } from "./constants/api_details";

const App = () => {

      // const headers = {
    //     'x-api-key': API_KEY
    // }

    const [cryptoData, setCryptoData] = useState<CryptoData[]>()
    const [loading, setLoading] = useState(true)

    
    const getCryptoData = async () => {
        try {

            // const res : AxiosResponse = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-crypto-price`, {headers: headers});

            console.log(res)



            setTimeout(() => {
                setCryptoData(res)
                setLoading(false)
              }, 6000);

         }catch (error) {
        
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=> {
        getCryptoData()
        console.log(cryptoData)
    }, [])


    return  <>
                <CryptoDataContext.Provider value={{cryptoData, loading}}>
                    <Navbar/>
                    <Outlet/>
                    <Footer/>
                </CryptoDataContext.Provider>
            </> 

}

const router = createBrowserRouter([{
    path: "",
    element: <App/>,
    children : [
        {
            path: "",
            element: <Home/>
        },{
            path: "/crypto/:cryptoSymbol",
            element: <CryptoDetails/>
        }
    ],
    errorElement: <Error/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router}/>)
  
