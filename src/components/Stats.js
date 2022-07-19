import unescoSiteData from "../data/chinaUnescoSiteData"
import { useSiteContext } from "../hooks/useSiteContext";

function Stats() {
  const {provinceSite, selectedProvince, totalNumOfLocalSites, chinaVisitedSite} = useSiteContext()
  const totalNumOfNationalSites = Array.from(new Set(unescoSiteData.map(site => site.name))).length
  const totalVisitedSiteCount = chinaVisitedSite.length
  const countLocalSitesVisited = provinceSite.filter(site => chinaVisitedSite.includes(site.name)).length
  const remainingLocalSites = totalNumOfLocalSites-countLocalSitesVisited

  return (
    <div className="stats shadow flex flex-end mb-6 border-2 border-sky-500 mr-4 sm: mx-2">        
        <div className="stat">
            <div className="stat-title">Progress</div>
            <div className="stat-value">{Math.ceil(totalVisitedSiteCount/totalNumOfNationalSites*100)}%</div>
            <div className="stat-desc text-secondary">{totalNumOfNationalSites - totalVisitedSiteCount} sites left</div>
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