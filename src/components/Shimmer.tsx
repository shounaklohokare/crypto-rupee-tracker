import { FC } from "react"
import TableHeader from "./TableHeader";

const Shimmer:FC = () => {

    const rows = Array.from({ length: 10 });

    return <div className="main-div md:h-[calc(100vh-3rem)] min-h-[calc(100vh-8vh)]">
                <div className="table-div">
                    <table className="tbl opacity-50 animate-shimmerPulse">
                        <TableHeader/>
                        <tbody>
                            {rows.map((_, index) => (
                                <ShimmerRow key={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

}

const ShimmerRow = () =>  { 

    return <tr>
                <td className="tbl-body-elem py-[1.45rem]"></td>
                <td className="tbl-body-elem py-[1.45rem]"></td>
                <td className="tbl-body-elem py-[1.45rem]"></td>
            </tr>

}

export default Shimmer;