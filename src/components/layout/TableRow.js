import { useSiteContext } from '../../hooks/useSiteContext';
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext';
import { db } from '../../firebase-config';
import { useLocation } from 'react-router-dom';

function TableRow({siteName, siteProvince}) {
    const {visitedSite, setVisitedSite} = useSiteContext()
    const {user} = useAuthContext();
    const location = useLocation();

    const removeSiteFromList = (site) => {
        let removedSiteIndex = visitedSite.indexOf(site)
        let tempVisitedSite = visitedSite.slice(0,removedSiteIndex).concat(visitedSite.slice(removedSiteIndex+1))
        setVisitedSite(tempVisitedSite)
        updateUserProgress(tempVisitedSite)
    }

    const handleCheck = (event) => {
        if(location.pathname === "/site"){
            if(visitedSite.includes(event.target.id)) {
                removeSiteFromList(event.target.id)
            }
            else{
                setVisitedSite(visitedSite.concat(event.target.id))
                updateUserProgress(visitedSite.concat(event.target.id))
            }
        } 
    }

    const checkedStatus = (site) => {
        if(visitedSite.includes(site)) return "checked"
        return ""
    }

    // update user progress
    const updateUserProgress = (visitedSiteList) => {
        const docRef = doc(db, "users", user.uid);        
                    // To update progress
                    updateDoc(docRef, {
                        "progress": visitedSiteList
                    });
                    console.log("user logged in, new data added!");
    }

    return (
        <tr>
            <th className='p-3'>
                <input id={siteName} type="checkbox" className="checkbox checkbox-primary" onChange={handleCheck} checked={checkedStatus(siteName)}/>
            </th>
            {
                (location.pathname === "/site") ? 
                    (<td className='whitespace-pre'>
                    <div className="font-bold text-xs"><p>{siteName}</p></div>
                </td>)
                : <></>
            }

            <td>
                {siteProvince}
            </td>
        </tr>
    )
}

export default TableRow