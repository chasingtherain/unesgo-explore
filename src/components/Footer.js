import React from 'react'
import { useLocation } from 'react-router-dom'

function Footer() {
    const location = useLocation()
    const date = new Date()
    const currentYear = date.getFullYear()
    const hideFooterAtSiteList = location.pathname === "/site" 
    return (
    <footer className={(hideFooterAtSiteList) ? "" :"footer footer-center p-2 bg-sky-100 text-base-content fixed inset-x-0 bottom-0"}>
        <div>
            {/* hide footer in site path due to overlapping issue */}
            {
                (hideFooterAtSiteList) ? ""
                : <p>Copyright © {currentYear} - All right reserved by ChasingTheRain</p>
            }
            
        </div>
    </footer>
    )
}

export default Footer