import { useContext } from 'react'
import SiteContext from '../contexts/SiteContext'

export const useSiteContext = () => {
    const siteContext = useContext(SiteContext)

    if (!siteContext) {throw Error("useSiteContext must be inside SiteContextProvider")}

    return siteContext
} 


