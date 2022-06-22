import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

function NavBar() {
    const {onGoogleClick} = useContext(AuthContext)

    return (
    <div>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <button className="btn btn-ghost normal-case text-xl">
                    <Link to="/">UNESCO TRACKER</Link>
                </button>
            </div>
            <div className="navbar-end">
                <button className ="btn text-lg px-8 mr-4" onClick={onGoogleClick}>
                    Login
                </button>
            </div>
        </div>
    </div>
    )
}

export default NavBar