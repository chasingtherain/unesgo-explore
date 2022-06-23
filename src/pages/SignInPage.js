import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

function SignInPage() {
    const {googleRedirect} = useContext(AuthContext)
    return (
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-28 card rounded-box place-items-center my-3'>
                <h1 className='font-bold text-xl'>Log in to continue</h1>
                <button className="btn btn-wide mt-6" onClick={googleRedirect}>Continue with Google</button>
            </div>
            <div className="divider">OR</div>
            <div className="grid h-56 card rounded-box place-items-center my-1">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" />
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" />
                </div>
                <button className="btn btn-wide btn-primary my-2">Log In</button>
                <Link to="/forgot-password" className='text-secondary'>Forgot password?</Link>
            </div>
            <div className="divider"></div>
            <div className="grid h-18 card rounded-box place-items-center">
                <h1 className='font-bold mb-2'>Don't have an account?</h1>
                <button className="btn btn-wide btn-secondary">
                    <Link to="/sign-up">Create an account</Link>
                </button>
            </div>
        </div>
    
    </div>
    )
}

export default SignInPage