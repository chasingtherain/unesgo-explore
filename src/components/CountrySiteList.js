import React, { useContext } from 'react'
import Alert from './Alert'
import Select from './layout/Select'
import Table from './layout/Table'
import Stats from './Stats'
import SiteContext from '../contexts/SiteContext'
import Spinner from './Spinner'

function CountrySiteList() {
  const {isLoading} = useContext(SiteContext)
  return (
    <div>
      {
      (isLoading) ?
      <Spinner/>
      :
      (
      <div>
        <div className='flex flex-wrap justify-between sm: justify-content align-center'>
          <Select/>
          <Stats/>
        </div>
        <div className='mt-4 mb-8'><Alert/></div>
        <Table/>
      </div>
    )

      }

    </div>
  )
}

export default CountrySiteList