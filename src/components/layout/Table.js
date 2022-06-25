import TableRow from "./TableRow"
import SiteContext from "../../contexts/SiteContext"
import { useContext, useEffect } from "react"
import { doc,getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

function Table() {
    const {provinceSite, selectedProvince, visitedSite, setVisitedState} = useContext(SiteContext)

    return (
    <div>
        <div className="overflow-x-auto">
            <table className="table table w-full">
            {/* <!-- head --> */}
            <thead>
                <tr>
                <th>
                    <label>
                    <input type="checkbox" className="checkbox" disabled={true} />
                    </label>
                </th>
                <th>Site Name</th>
                <th>Province / Region</th>
                </tr>
            </thead>
            <tbody>
                {/* <!-- row 1 --> */}
                {
                    provinceSite
                        .map((site,index) =>  <TableRow key={index} siteName={site.name} siteProvince={site.admin_region}/>)
                }
            </tbody>    
            </table>
        </div>
    </div>
    )
}

export default Table