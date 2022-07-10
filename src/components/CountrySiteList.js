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
          <Select/>
          <Stats/>
        </div>
        {/* <div className='flex flex-col justify-center items-center'> */}
        <div className='flex flex-col justify-center items-center sm: flex flex-wrap justify-between'>
          {user && (<button className="btn btn-secondary text-sm btn-sm -my-2">
              <Link to="/province-list">View Province List</Link>
          </button>)}
                  <div className='mb-8'><Alert/></div>
                  {(totalNumOfLocalSites) ? <Table/>
                    : <h3 className='text-xl grid place-items-center'>No UNESCO site in <strong>{selectedProvince}</strong></h3>
                  }
          </div>
        </div>
    </div>
  )
}

export default CountrySiteList