import React, { useContext, useEffect} from 'react'
import SiteContext from '../../contexts/SiteContext';
import AuthContext from '../../contexts/AuthContext';

function TableRow({siteName, siteProvince}) {
    const {visitedSite, removeSiteFromList, setVisitedSite} = useContext(SiteContext)
    const handleCheck = (event) => {
        if(visitedSite.includes(event.target.id)) {
            removeSiteFromList(event.target.id)
        }
        else{
            setVisitedSite(visitedSite.concat(event.target.id))
        }
    }
    
    const checkedStatus = (site) => {
        if(visitedSite.includes(site)) return "checked"
        return ""
    }

    return (
        <tr>
            <th>
                <input id={siteName} type="checkbox" className="checkbox checkbox-primary" onChange={handleCheck} checked={checkedStatus(siteName)}/>
            </th>
            <td>
                <div className="font-bold">{siteName}</div>
            </td>
            <td>
                {siteProvince}
            </td>
        </tr>
    )
}

export default TableRow