import { FC }from 'react';

const TableHeader:FC = () => {

    return <thead>
                <tr>
                    <th className="tbl-head-elem">Name</th>
                    <th className="tbl-head-elem">Price</th>
                    <th className="tbl-head-elem px-0 md:px-3">Change</th>
                    <th className="px-0 mx-0 !important"></th>
                </tr>
            </thead>

}

export default TableHeader;