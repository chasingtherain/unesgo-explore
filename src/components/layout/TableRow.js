import { useSiteContext } from '../../hooks/useSiteContext';

function TableRow({siteName, siteProvince}) {
    const {updateUserProgress, visitedSite, setVisitedSite} = useSiteContext()
    
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
            <th className='p-3'>
                <input id={siteName} type="checkbox" className="checkbox checkbox-primary" onChange={handleCheck} checked={checkedStatus(siteName)}/>
            </th>
            <td className='whitespace-pre'>
                <div className="font-bold text-xs"><p>{siteName}</p></div>
            </td>
            <td>
                {siteProvince}
            </td>
        </tr>
    )
}

export default TableRow