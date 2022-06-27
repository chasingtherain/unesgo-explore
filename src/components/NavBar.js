import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useLocation, useNavigate } from 'react-router-dom'
import SiteContext from '../contexts/SiteContext'
import { getAuth, signOut } from 'firebase/auth'

function NavBar() {
    const {currentUser, setVisitedSite, setCurrentUser, setSelectedProvince} = useContext(SiteContext)
    const navigate = useNavigate()
    const auth = getAuth()
    // sign out user from platform
    const signOutCurrentUser = () =>{
        // console.log(auth)
        console.log("sign out function triggered");
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("sign out successful");
            setCurrentUser("")
            setVisitedSite([])
            setSelectedProvince("All Province / Region")
            navigate('/')

          }).catch((error) => {
            // An error happened.
            console.log(error,"sign out was unsuccessful");
          });
    }

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