import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// import { useLocation, useNavigate } from 'react-router-dom'
import SiteContext from '../contexts/SiteContext'

function NavBar() {
    const {currentUser, signOutCurrentUser} = useContext(SiteContext)


    return (
    <div>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <button className="btn btn-ghost normal-case text-xl">
                    <Link to="/">UNES<span className="text-sky-600">GO EXPLORE</span> </Link>
                </button>
            </div>
            <div className="navbar-end">
                {
                    (currentUser) ? 
                    (<button className ="btn text-xs px-2" onClick={signOutCurrentUser}> Log Out </button>)
                    : (<button className ="btn text-xs px-2"> <Link to="/sign-in"> Login / Sign Up</Link> </button>)

                }


            </div>
        </div>
    </div>
    )
}

export default NavBar