import unescoSiteData from "../unescoSiteData"
import { useSiteContext } from "../hooks/useSiteContext";

function ProvinceListStats() {
  const {provinceData} = useSiteContext()
  const visitedProvinceSite = 5
  const totalNumOfProvinces = provinceData.length




  return (
    <div className="stats shadow border-2 border-sky-500 mx-10 px-25">        
        <div className="stat grid place-items-center">
            <div className="text-lg md:text-lg">I have visited <strong>{visitedProvinceSite}</strong> regions in China</div>
            <div className="text-md md:text-md"><strong>{totalNumOfProvinces - visitedProvinceSite}</strong> regions left</div>
        </div>
    </div>
  )
}

export default ProvinceListStats