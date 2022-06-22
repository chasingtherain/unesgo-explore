import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import SiteContext from '../../contexts/SiteContext'


function Select() {
  const location = useLocation()
  const {handleSelectProvince, provinceData} = useContext(SiteContext)
  
  return (
    <div>
        <select class="ml-6 mt-6 mb-6 select select-info w-full max-w-xs sm:select-sm md:select-md lg:select-lg" onChange={handleSelectProvince}>
        
        {
        (location.pathname === "/") ?
        <option disabled selected>Select Country</option>
        : provinceData.map(
          item => <option id={item}>{item}</option>
        )}
        </select>
    </div>
  )
}

export default Select