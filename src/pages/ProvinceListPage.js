import React from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import Table from '../components/layout/Table'
import ProvinceListStats from '../components/ProvinceListStats'
import { useAuthContext } from '../hooks/useAuthContext'

export default function ProvinceListPage() {
    const {user} = useAuthContext()

    return (
    <div>
      <div className="grid place-items-center h-screen">
        <div className='my-3'>
          <ProvinceListStats/>
        </div>
        {/* show button only if user is logged in */}
        {user && (<button className="btn btn-secondary text-md btn-sm my-1 sm: text-xs">
            <Link to="/site">View UNESCO Sites</Link>
        </button>)}
        <div className='mb-4'><Alert/></div>
        <Table region="Province"/>
      </div>
    </div>
    )
}
