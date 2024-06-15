import { FC } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const Navbar:FC = () => {
    const location = useLocation();

    const navigate = useNavigate();

    return <div className="navbar">
                { location.pathname.startsWith("/crypto/") ? <div className="absolute left-2 md:left-7"><IoMdArrowRoundBack color={"white"} className="text-3xl  md:text-4xl" onClick={()=> { navigate("") }} /></div> : <></>}
                <h1 className="header"><Link to="">Crypto Rupee Tracker</Link></h1>
            </div>

}

export default Navbar;