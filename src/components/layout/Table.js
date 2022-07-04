import TableRow from "./TableRow"
import { useSiteContext } from "../../hooks/useSiteContext";

function Table() {
    const {provinceSite} = useSiteContext()

    return (
    <div>
        <div className="grid place-items-center overflow-x-auto">
            <table className="table w-1/2">
            {/* <!-- head --> */}
            <thead>
                <tr>
                <th className="p-3"> 
                    <label>
                    <input type="checkbox" className="checkbox" disabled={true} />
                    </label>
                </th>
                <th>Site Name</th>
                <th>Province / Region</th>
                </tr>
            </thead>
            <tbody className="whitespace-pre">
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