import unescoSiteData from "../unescoSiteData"
import SiteContext from "../contexts/SiteContext"
import { useContext } from "react";

function Stats() {
  const {provinceSite, selectedProvince, visitedSite} = useContext(SiteContext)
  const totalNumOfNationalSites = Array.from(new Set(unescoSiteData.map(site => site.name))).length
  const totalVisitedSiteCount = visitedSite.length

  const totalNumOfLocalSites = provinceSite.length

  const countLocalSitesVisited = provinceSite.filter(site => visitedSite.includes(site.name)).length
  const remainingLocalSites = totalNumOfLocalSites-countLocalSitesVisited

  return (
    <div className="stats shadow flex flex-end mb-6 border-2 border-sky-500 mr-2 sm: mx-5">        
        <div className="stat">
            <div className="stat-title">Progress</div>
            <div className="stat-value">{Math.ceil(totalVisitedSiteCount/totalNumOfNationalSites*100)}%</div>
            <div className="stat-desc text-secondary">{totalNumOfNationalSites - totalVisitedSiteCount} national sites left</div>
        </div>
        <div className="stat">
            <div className="stat-title">Progress</div>
            <div className="stat-value">
              {/* if local site is undefined or province === all, show a "-" for local progress and hide subtext*/}
              {(totalNumOfLocalSites && selectedProvince !== "All Province / Region") ?
              `${Math.ceil(countLocalSitesVisited/totalNumOfLocalSites*100)}%`
              : `-`
              }
              </div>
            <div className="stat-desc text-secondary">
              {
              (totalNumOfLocalSites && selectedProvince !== "All Province / Region") ?
              `${remainingLocalSites} sites left in ${selectedProvince}`
              : `-`
              }
              
            </div>
        </div>
    </div>
  )
}

export default Stats