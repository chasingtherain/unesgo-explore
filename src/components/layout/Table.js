import TableRow from "./TableRow"
import { useSiteContext } from "../../hooks/useSiteContext";
import { useLocation } from "react-router-dom";

function Table() {
    const {provinceList, provinceSite} = useSiteContext()
    const location = useLocation()
    return (
    <div>
        <div className="grid place-items-center overflow-x-scroll">
            <table className="table w-1/2">
            {/* <!-- head --> */}
            <thead>
                <tr>
                <th className="p-3"> 
                    <label>
                    <input type="checkbox" className="checkbox" disabled={true} />
                    </label>
                </th>
                {/* hides site column for  */}
                {(location.pathname === "/site") ? <th>Site Name</th> : <></>}
                
                <th>Region</th>
                </tr>
            </thead>
            <tbody className="whitespace-pre text-xs">
                {/* <!-- row 1 --> */}
                {
                    (location.pathname === "/site") ?
                    provinceSite.map((site,index) =>  <TableRow data-testid="foo" key={index} siteName={site.name} siteProvince={site.admin_region}/>)
                    : provinceList.map((site,index) =>  <TableRow data-testid="foo" key={index} siteProvince={site}/>)
                
                }
            </tbody>    
            </table>
        </div>
    </div>
    )
}

export default Table