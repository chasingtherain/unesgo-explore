import unescoSiteData from "../../unescoSiteData"
import TableRow from "./TableRow"
import SiteContext from "../../contexts/SiteContext"
import { useContext, useState } from "react"

function Table() {
    const {provinceSite, selectedProvince} = useContext(SiteContext)
    // console.log(unescoSiteData)
    // console.log(provinceSite);


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