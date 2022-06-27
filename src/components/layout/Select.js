import React, { useContext } from 'react'
import unescoSiteData from '../../unescoSiteData'
import { useLocation } from 'react-router-dom'
import SiteContext from '../../contexts/SiteContext'


function Select() {
  const provinceData = ["All Province / Region","Anhui","Beijing",  "Chongqing",  "Fujian",  "Gansu",  "Guangdong",  "Guangxi",  "Guizhou",  "Hainan",  "Hebei",  "Heilongjiang",  "Henan",  "Hong Kong",  "Hubei",  "Hunan",  "Inner Mongolia",  "Jiangsu",  "Jiangxi",  "Jilin",  "Liaoning",  "Macau",  "Ningxia",  "Qinghai",  "Shaanxi",  "Shandong",  "Shanghai",  "Shanxi",  "Sichuan",  "Tianjin","Tibet",  "Xinjiang","Yunnan","Zhejiang"]
  const location = useLocation()
  const {setProvinceSite,setSelectedProvince} = useContext(SiteContext)

  const handleSelectProvince = (event) => {
    setSelectedProvince(event.target.value);
    
    if(event.target.value === "All Province / Region"){setProvinceSite(unescoSiteData.map(site => site))}
    else{ setProvinceSite(unescoSiteData.filter(object => object["admin_region"] === event.target.value))}
  }
  
  return (
    <div>
        <select className="ml-6 mt-6 mb-6 select select-info w-full max-w-xs sm:select-sm md:select-md lg:select-lg" onChange={handleSelectProvince}>
        
        {
        (location.pathname === "/") ?
        <option disabled selected>China</option>
        : provinceData.map(
          (item,index) => <option key={index} id={item}>{item}</option>
        )}
        </select>
    </div>
  )
}

export default Select