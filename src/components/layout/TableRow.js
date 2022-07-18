import { useSiteContext } from '../../hooks/useSiteContext';
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext';
import { db } from '../../firebase-config';
import { useLocation } from 'react-router-dom';

function TableRow({siteName, siteProvince}) {
    const {visitedSite, setVisitedSite, visitedProvinceList, setVisitedProvinceList} = useSiteContext()
    const {user} = useAuthContext();
    const location = useLocation();

    const removeSiteFromList = (site) => {
        if(location.pathname === "/site"){
            let removedSiteIndex = visitedSite.indexOf(site)
            let tempVisitedSite = visitedSite.slice(0,removedSiteIndex).concat(visitedSite.slice(removedSiteIndex+1))
            setVisitedSite(tempVisitedSite)
            updateUserProgress(tempVisitedSite)
        }
        if(location.pathname === "/province-list"){
            let removedProvinceIndex = visitedProvinceList.indexOf(site)
            let tempVisitedProvinceList = visitedProvinceList.slice(0,removedProvinceIndex).concat(visitedProvinceList.slice(removedProvinceIndex+1))
            setVisitedProvinceList(tempVisitedProvinceList)
            updateUserProgress(tempVisitedProvinceList)
        }
    }

    const handleCheck = (event) => {
        console.log(event);
        if(location.pathname === "/site"){
            if(visitedSite.includes(event.target.id)) {
                removeSiteFromList(event.target.id)
            }
            else{
                console.log("unesco data", event.target.id);
                setVisitedSite(visitedSite.concat(event.target.id))
                updateUserProgress(visitedSite.concat(event.target.id))
            }
        } 
        if(location.pathname === "/province-list"){
            if(visitedProvinceList.includes(event.target.id)) {
                removeSiteFromList(event.target.id)
            }
            else{
                console.log("trying to add province data", event.target.id);
                setVisitedProvinceList(visitedProvinceList.concat(event.target.id))
                updateUserProgress(visitedProvinceList.concat(event.target.id))
            }
        } 
    }

    const checkedStatus = (site) => {
        if(location.pathname === "/site"){
            if(visitedSite.includes(site)) return "checked"
            // console.log("unchecking");
            return ""
        }
        if(location.pathname === "/province-list"){
            if(site && visitedProvinceList.includes(site)) return "checked"
            // console.log("unchecking");
            return ""
        }
    }
    // update user progress
    const updateUserProgress = (checkedItem) => {
        if(location.pathname === "/site" && user){
            const docRef = doc(db, "users", user.uid)    
            // To update progress
            updateDoc(docRef, {
                "unescoListProgress": checkedItem
            });
            console.log("user logged in, new data added to unesco list!");
        }
        if(location.pathname === "/province-list" && user){
            const docRef = doc(db, "users", user.uid)    
            // To update progress
            updateDoc(docRef, {
                "provinceListProgress": checkedItem
            });
            console.log("user logged in, new data added to province list!");
        }

    }

    return (
        <>
        {
        (location.pathname === "/site") ?
            (<tr>
                <th className='p-3'>
                    <input id={siteName} type="checkbox" data-testid="checkbox-element" className="checkbox checkbox-primary" onChange={handleCheck} checked={checkedStatus(siteName)}/>
                </th>
                <td className='whitespace-pre'>
                        <div className="font-bold text-xs"><p>{siteName}</p></div>
                </td>

                <td>{siteProvince}</td>
            </tr>) : <></>
        }
        {(location.pathname === "/province-list") ?
            (<tr>
                <th className='p-3'>
                    <input id={siteProvince} type="checkbox" className="checkbox checkbox-primary" onChange={handleCheck} checked={checkedStatus(siteProvince)}/>
                </th>
                <td className='text-lg pl-5 pr-20'>{siteProvince}</td>
            </tr>) : <></>
        }
        </>
    )
}

export default TableRow