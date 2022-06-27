import React, { useContext} from 'react'
import SiteContext from '../../contexts/SiteContext';
import { doc,updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

function TableRow({siteName, siteProvince}) {
    const {currentUser,updateUserProgress, visitedSite, setVisitedSite} = useContext(SiteContext)
    
    const removeSiteFromList = (site) => {
        let removedSiteIndex = visitedSite.indexOf(site)
        let tempVisitedSite = visitedSite.slice(0,removedSiteIndex).concat(visitedSite.slice(removedSiteIndex+1))
        setVisitedSite(tempVisitedSite)
        updateUserProgress(tempVisitedSite)
    }

    const handleCheck = (event) => {
        if(visitedSite.includes(event.target.id)) {
            removeSiteFromList(event.target.id)
        }
        else{
            setVisitedSite(visitedSite.concat(event.target.id))
            updateUserProgress(visitedSite.concat(event.target.id))
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