import { useSiteContext } from "../hooks/useSiteContext";

function ProvinceListStats() {
  const {provinceList, visitedProvinceList} = useSiteContext()

  return (
    <div className="stats shadow border-2 border-sky-500 mx-10 px-25">        
        <div className="stat grid place-items-center">
            <div className="text-lg md:text-lg">I have visited <strong className="text-2xl">{visitedProvinceList.length}</strong> regions in China</div>
            <div className="text-md md:text-lg"><strong className="text-2xl">{provinceList.length - visitedProvinceList.length}</strong> regions left</div>
        </div>
    </div>
  )
}

export default ProvinceListStats