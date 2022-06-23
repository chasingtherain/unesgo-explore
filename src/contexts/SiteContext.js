import React, { createContext, useState } from 'react'
import unescoSiteData from '../unescoSiteData'

const SiteContext = createContext()

const provinceData = ["All Province / Region","Anhui","Beijing",  "Chongqing",  "Fujian",  "Gansu",  "Guangdong",  "Guangxi",  "Guizhou",  "Hainan",  "Hebei",  "Heilongjiang",  "Henan",  "Hong Kong",  "Hubei",  "Hunan",  "Inner Mongolia",  "Jiangsu",  "Jiangxi",  "Jilin",  "Liaoning",  "Macau",  "Ningxia",  "Qinghai",  "Shaanxi",  "Shandong",  "Shanghai",  "Shanxi",  "Sichuan",  "Tianjin","Tibet",  "Xinjiang","Yunnan","Zhejiang"]

export const SiteContextProvider = ({children}) => {
    const [selectedProvince, setSelectedProvince] = useState("All Province / Region")
    const [provinceSite, setProvinceSite] = useState((unescoSiteData.map(site => site)))
    const [visitedSite, setVisitedSite] = useState([])



    const handleSelectProvince = (event) => {
        setSelectedProvince(event.target.value);
        
        if(event.target.value === "All Province / Region"){setProvinceSite(unescoSiteData.map(site => site))}
        else{ setProvinceSite(unescoSiteData.filter(object => object["admin_region"] === event.target.value))}
      }
    
    
    const removeSiteFromList = (site) => {
        let removedSiteIndex = visitedSite.indexOf(site)
        let tempVisitedSite = visitedSite.slice(0,removedSiteIndex).concat(visitedSite.slice(removedSiteIndex+1))
        // console.log(visitedSite, tempVisitedSite);
        setVisitedSite(tempVisitedSite)
    }

    return <SiteContext.Provider value={{
        provinceData,
        provinceSite,
        selectedProvince,
        visitedSite,
        handleSelectProvince,
        removeSiteFromList,
        setSelectedProvince,
        setVisitedSite
    }}>
        {children}
    </SiteContext.Provider>
}

export default SiteContext