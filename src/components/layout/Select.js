import unescoSiteData from '../../unescoSiteData'
import { useSiteContext } from '../../hooks/useSiteContext'


function Select() {
  const provinceData = ["All Province / Region","Anhui","Beijing",  "Chongqing",  "Fujian",  "Gansu",  "Guangdong",  "Guangxi",  "Guizhou",  "Hainan",  "Hebei",  "Heilongjiang",  "Henan",  "Hong Kong",  "Hubei",  "Hunan",  "Inner Mongolia",  "Jiangsu",  "Jiangxi",  "Jilin",  "Liaoning",  "Macau",  "Ningxia",  "Qinghai",  "Shaanxi",  "Shandong",  "Shanghai",  "Shanxi",  "Sichuan",  "Tianjin","Tibet",  "Xinjiang","Yunnan","Zhejiang"]
  const {setProvinceSite,setSelectedProvince} = useSiteContext()

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