import unescoSiteData from '../../unescoSiteData'
import { useSiteContext } from '../../hooks/useSiteContext'


function Select() {
  const {provinceData, setProvinceSite,setSelectedProvince} = useSiteContext()

  const handleSelectProvince = (event) => {
    setSelectedProvince(event.target.value);
    
    if(event.target.value === "All Province / Region"){setProvinceSite(unescoSiteData.map(site => site))}
    else{ setProvinceSite(unescoSiteData.filter(object => object["admin_region"] === event.target.value))}
  }
  
  return (
    <div>
        <select className="ml-6 mt-6 mb-6 select select-info w-72" onChange={handleSelectProvince}>
        {provinceData.map((item,index) => <option key={index} id={item}>{item}</option>)}
        </select>
    </div>
  )
}

export default Select