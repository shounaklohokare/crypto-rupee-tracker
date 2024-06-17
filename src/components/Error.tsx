import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";

const Error = () => {

    return <div className="main-div flex align-middle justify-center items-center">
        <div className="absolute top-5 left-10"><Link to=""><CiHome size="36" /></Link></div>
        <h1 className="md:text-5xl text-xl text-center py-4 my-6 font-semibold overflow-hidden text-wrap">Something went wrong! Go to home page and try again!</h1>
    </div>

}

export default Error;