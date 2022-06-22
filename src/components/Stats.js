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
  console.log(countLocalSitesVisited);
  // console.log(provinceSite);

  return (
    <div class="stats shadow flex flex-end mb-6 border-2 border-sky-500 mr-4 sm: mx-5">        
        <div class="stat">
            <div class="stat-title">Progress</div>
            <div class="stat-value">{Math.ceil(totalVisitedSiteCount/totalNumOfNationalSites*100)}%</div>
            <div class="stat-desc text-secondary">{totalNumOfNationalSites - totalVisitedSiteCount} national sites left</div>
        </div>
        <div class="stat">
            <div class="stat-title">Progress</div>
            <div class="stat-value">
              {/* if local site is undefined or province === all, show a "-" for local progress and hide subtext*/}
              {(totalNumOfLocalSites && selectedProvince !== "All") ?
              `${Math.ceil(countLocalSitesVisited/totalNumOfLocalSites*100)}%`
              : `-`
              }
              </div>
            <div class="stat-desc text-secondary">
              {
              (totalNumOfLocalSites && selectedProvince !== "All") ?
              `${remainingLocalSites} sites left in ${selectedProvince}`
              : `-`
              }
              
            </div>
        </div>
    </div>
  )
}

export default Stats