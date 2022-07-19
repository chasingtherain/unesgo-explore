import { useSiteContext } from '../../hooks/useSiteContext';
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext';
import { db } from '../../firebase-config';
import { useLocation } from 'react-router-dom';

function TableRow({siteName, siteRegion}) {
    const {chinaVisitedSite, setChinaVisitedSite, seaVisitedSite, setSeaVisitedSite, visitedProvinceList, setVisitedProvinceList} = useSiteContext()
    const {user} = useAuthContext();
    const location = useLocation();

    const removeSiteFromList = (site) => {
        switch(location.pathname) {
            case "/site":
                let removedChinaSiteIndex = chinaVisitedSite.indexOf(site)
                let tempChinaVisitedSite = chinaVisitedSite.slice(0,removedChinaSiteIndex).concat(chinaVisitedSite.slice(removedChinaSiteIndex+1))
                setChinaVisitedSite(tempChinaVisitedSite)
                updateUserProgress(tempChinaVisitedSite)
                break;
            case "/southeast-asia":
                let removedSeaSiteIndex = seaVisitedSite.indexOf(site)
                let tempSeaVisitedSite = seaVisitedSite.slice(0,removedSeaSiteIndex).concat(seaVisitedSite.slice(removedSeaSiteIndex+1))
                setSeaVisitedSite(tempSeaVisitedSite)
                updateUserProgress(tempSeaVisitedSite)
                break;
            case "/province-list":
                let removedProvinceIndex = visitedProvinceList.indexOf(site)
                let tempVisitedProvinceList = visitedProvinceList.slice(0,removedProvinceIndex).concat(visitedProvinceList.slice(removedProvinceIndex+1))
                setVisitedProvinceList(tempVisitedProvinceList)
                updateUserProgress(tempVisitedProvinceList)
                break;
            default:
                throw new Error("invalid path name")
        }
    }

    const handleCheck = (event) => {
        console.log(event);
        switch(location.pathname) {
            case "/site":
                if(chinaVisitedSite.includes(event.target.id)) {
                    removeSiteFromList(event.target.id)
                }
                else{
                    console.log("unesco data", event.target.id);
                    setChinaVisitedSite(chinaVisitedSite.concat(event.target.id))
                    updateUserProgress(chinaVisitedSite.concat(event.target.id))
                }
                break;
            case "/southeast-asia":
                if(seaVisitedSite.includes(event.target.id)) {
                    removeSiteFromList(event.target.id)
                }
                else{
                    console.log("unesco data", event.target.id);
                    setSeaVisitedSite(seaVisitedSite.concat(event.target.id))
                    updateUserProgress(seaVisitedSite.concat(event.target.id))
                }
                break;
            case "/province-list":
                if(visitedProvinceList.includes(event.target.id)) {
                    removeSiteFromList(event.target.id)
                }
                else{
                    console.log("trying to add province data", event.target.id);
                    setVisitedProvinceList(visitedProvinceList.concat(event.target.id))
                    updateUserProgress(visitedProvinceList.concat(event.target.id))
                }
                break;
            default:
                throw new Error("invalid path name")
        }
    }

    const checkedStatus = (site) => {
        switch(location.pathname){
            case "/site":
                if(chinaVisitedSite.includes(site)) return "checked"
                return ""
            case "/southeast-asia":
                if(seaVisitedSite.includes(site)) return "checked"
                return ""
            case "/province-list":
                if(visitedProvinceList.includes(site)) return "checked"
                return ""
            default:
                return ""
        }
    }

    const updateUserProgress = (checkedItem) => {
        if (user){
            const docRef = doc(db, "users", user.uid)  
            switch(location.pathname){
                case "/site":
                    updateDoc(docRef, {"unescoListProgress": checkedItem});
                    break;
                case "/southeast-asia":
                    updateDoc(docRef, {"seaUnescoProgress": checkedItem})
                    break;
                case "/province-list":
                    updateDoc(docRef, {"provinceListProgress": checkedItem})
                    break;
                default:
                    throw new Error("site path does not exist")
            }
            console.log("user logged in, new data added to unesco list!");
        }
        else console.log("user not logged in")
    }

    return (
        <>
        {
        (location.pathname !== "/province-list") ?
            (<tr>
                <th className='p-3'>
                    <input id={siteName} type="checkbox" data-testid="checkbox-element" className="checkbox checkbox-primary" onChange={handleCheck} checked={checkedStatus(siteName)}/>
                </th>
                <td className='whitespace-pre'>
                        <div className="font-bold text-xs"><p>{siteName}</p></div>
                </td>

                <td>{siteRegion}</td>
            </tr>) : <></>
        }
        {(location.pathname === "/province-list") ?
            (<tr>
                <th className='p-3'>
                    <input id={siteRegion} type="checkbox" className="checkbox checkbox-primary" onChange={handleCheck} checked={checkedStatus(siteRegion)}/>
                </th>
                <td className='text-lg pl-5 pr-20'>{siteRegion}</td>
            </tr>) : <></>
        }
        </>
    )
}

export default TableRow