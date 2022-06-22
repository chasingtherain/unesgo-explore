import React from 'react'
import Alert from './Alert'
import Select from './layout/Select'
import Table from './layout/Table'
import Stats from './Stats'

function CountrySiteList() {
  return (
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

export default CountrySiteList