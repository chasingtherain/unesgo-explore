import Alert from './Alert'
import Select from './layout/Select'
import Table from './layout/Table'
import Stats from './Stats'
import { useSiteContext } from '../hooks/useSiteContext'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function CountrySiteList() {
  const {selectedProvince, totalNumOfLocalSites} = useSiteContext()
  const {user} = useAuthContext()
  return (
    <div>
      <div>
        <div className='flex flex-col justify-center items-center sm: flex flex-col'>
        {/* <div className='flex flex-wrap justify-between sm: flex flex-col justify-center items-center'> */}
          {/* <Select/> */}
          {/* <Stats/> */}
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

export default CountrySiteList