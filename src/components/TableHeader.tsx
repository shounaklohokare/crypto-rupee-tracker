import { FC }from 'react';

const TableHeader:FC = () => {

    return <thead>
                <tr>
                    <th className="tbl-head-elem">Name</th>
                    <th className="tbl-head-elem">Price</th>
                    <th className="tbl-head-elem">Change</th>
                </tr>
            </thead>

}

export default TableHeader;