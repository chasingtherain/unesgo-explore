import Alert from './Alert'
import Select from './layout/Select'
import Table from './layout/Table'
import Stats from './Stats'
import { useSiteContext } from '../hooks/useSiteContext'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import seaUnescoSiteData from '../data/seaUnescoSiteData'

function RegionSiteList({region}) {
    const {user} = useAuthContext()
    const {seaVisitedSite} = useSiteContext()
    const location = useLocation()
    const totalSiteCount = () => {
        switch(location.pathname){
            case "/southeast-asia":
                return seaUnescoSiteData.length
            default:
                throw new Error("Invalid path name, could not get total site count")
        }
    }
    return (
    <div>
        <div>
        <div className='flex flex-col justify-center items-center sm: flex flex-col'>
        {/* <div className='flex flex-wrap justify-between sm: flex flex-col justify-center items-center'> */}
            {/* <Select/> */}
            {/* <Stats region="southeast-asia" totalSiteCount={totalSiteCount}/>      */}
        <div className='stats shadow border-2 border-sky-500'>
            <div className="stat flex flex-col items-center">
                <div className="stat-title">{region}</div>
                <div className="stat-value">{(seaVisitedSite.length / totalSiteCount() * 100).toFixed(1)}%</div>
                <div className="stat-desc text-lg">completed</div>
                <div className="stat-desc text-secondary">{totalSiteCount() - seaVisitedSite.length} sites left</div>
            </div>
        </div>
        </div>
        {/* <div className='flex flex-col justify-center items-center'> */}
        <div className='flex flex-col justify-center items-center sm: flex flex-wrap justify-between'>
            <div className='mb-8'><Alert/></div>
                <Table name="Site Name" region="Country"/>
            </div>
        </div>
    </div>
    )
}

export default RegionSiteList