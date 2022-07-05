import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useSiteContext } from '../hooks/useSiteContext'
import { auth } from '../firebase-config'
import { useAuthContext } from '../hooks/useAuthContext'

function NavBar() {
    const {currentUser, setVisitedSite, setCurrentUser, setSelectedProvince} = useSiteContext()
    const {dispatch} = useAuthContext()

    const navigate = useNavigate()

    // sign out user from platform
    const signOutCurrentUser = () =>{
        console.log("sign out function triggered");
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch({type: "LOGOUT", payload: null})
            setSelectedProvince("All Province / Region")
            setCurrentUser("")
            setVisitedSite([])
            console.log("sign out successful");
            navigate('/sign-in')

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
                {currentUser && <button className ="btn text-xs px-2" onClick={signOutCurrentUser}> Log Out </button>}
                {!currentUser && <button className ="btn text-xs px-2"> <Link to="/sign-in"> Login / Sign Up</Link> </button>}
            </div>
        </div>
    </div>
    )
}

export default NavBar