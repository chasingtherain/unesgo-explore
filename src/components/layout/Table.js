import TableRow from "./TableRow"
import { useSiteContext } from "../../hooks/useSiteContext";
import { useLocation } from "react-router-dom";
import seaUnescoSiteData from "../../data/seaUnescoSiteData"

function Table({name, region}) {
    const {provinceList, provinceSite} = useSiteContext()
    const location = useLocation()
    const tableData = (sitePath) => {
        switch(sitePath) {
            case "/province-list":
                return provinceList.map((site,index) =>  <TableRow data-testid="foo" key={index} siteRegion={site}/>)
            case "/site":
                return provinceSite.map((site,index) =>  <TableRow data-testid="foo" key={index} siteName={site.name} siteRegion={site.admin_region}/>)
            case "/southeast-asia":
                return seaUnescoSiteData.map((site,index) =>  <TableRow data-testid="foo" key={index} siteName={site.name} siteRegion={site.country}/>)
            default:
                return <p>error encountered</p>
          }
    }

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
                {(location.pathname !== "/province-list") ? <th>{name}</th> : <></>}
                
                <th>{region}</th>
                </tr>
            </thead>
            <tbody className="whitespace-pre text-xs">
                {/* <!-- row 1 --> */}
                {/* {
                    (location.pathname === "/site") ?
                    provinceSite.map((site,index) =>  <TableRow data-testid="foo" key={index} siteName={site.name} siteRegion={site.admin_region}/>)
                    : provinceList.map((site,index) =>  <TableRow data-testid="foo" key={index} siteRegion={site}/>)
                
                } */}
                {
                    tableData(location.pathname)
                }
            </tbody>    
            </table>
        </div>
    </div>
    )
}

export default Table