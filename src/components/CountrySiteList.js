import Alert from './Alert'
import Select from './layout/Select'
import Table from './layout/Table'
import Stats from './Stats'
import { useSiteContext } from '../hooks/useSiteContext'

function CountrySiteList() {
  const {selectedProvince, totalNumOfLocalSites} = useSiteContext()
  return (
    <div>
      <div>
        <div className='flex flex-wrap justify-between sm: justify-content align-center'>
          <Select/>
          <Stats/>
        </div>
        <div className='mt-4 mb-8'><Alert/></div>
        {
        (totalNumOfLocalSites) ? 
          <Table/>
          : <h3 className='text-xl grid place-items-center'>No UNESCO site in <strong>{selectedProvince}</strong></h3>
        }
      </div>
    </div>
  )
}

export default CountrySiteList