import React, { useContext } from 'react'
import SiteContext from '../contexts/SiteContext'


function Alert() {
    const {currentUser} = useContext(SiteContext)
    // console.log(currentUser);
    return (
    <div>
        {
            (currentUser) ? 
                <div></div>:
                (<div className="alert alert-warning shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Login to save your progress!</span>
                    </div>
                </div>)
        }

    </div>
  )
}

export default Alert