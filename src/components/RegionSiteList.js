import Alert from './Alert'
import Select from './layout/Select'
import Table from './layout/Table'
import Stats from './Stats'
import { useSiteContext } from '../hooks/useSiteContext'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import seaUnescoSiteData from '../data/seaUnescoSiteData'

function RegionSiteList() {
    const {selectedProvince, totalNumOfLocalSites} = useSiteContext()
    const {user} = useAuthContext()
    const totalSiteCount = seaUnescoSiteData.length
    console.log(totalSiteCount);
    return (
    <div>
        <div>
        <div className='flex flex-col justify-center items-center sm: flex flex-col'>
        {/* <div className='flex flex-wrap justify-between sm: flex flex-col justify-center items-center'> */}
            {/* <Select/> */}
            {/* <Stats region="southeast-asia" totalSiteCount={totalSiteCount}/>      */}
        <div className='stats shadow mb-6 border-2 border-sky-500'>
            <div className="stat flex flex-col items-center">
                <div className="stat-title">Southeast Asia Progress</div>
                <div className="stat-value">50%</div>
                <div className="stat-desc text-secondary">20 sites left</div>
            </div>
        </div>
        </div>
        {/* <div className='flex flex-col justify-center items-center'> */}
        <div className='flex flex-col justify-center items-center sm: flex flex-wrap justify-between'>
            <div className='mb-8'><Alert/></div>
                {/* <Table name="Site Name" region="Country"/> */}
            </div>
        </div>
    </div>
    )
}

export default RegionSiteList