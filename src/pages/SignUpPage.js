import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

function SignUpPage() {
    const {setUserEmail,setUserPassword, signUpWithEmail} = useContext(AuthContext)

    const getEmailInput = (event) => {setUserEmail(event.target.value);}
    const getPasswordInput = (event) => { setUserPassword(event.target.value);}

    return (
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-28 card rounded-box place-items-center my-3'>
                <button className="btn btn-wide mt-6">Sign Up with Google</button>
            </div>
            <div className="divider">OR</div>
            <div className="grid h-56 card rounded-box place-items-center my-1">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" onChange={getEmailInput}/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" onChange={getPasswordInput}/>
                </div>
                <button className="btn btn-wide btn-primary my-2" onClick={signUpWithEmail}>Sign Up</button>
            </div>
            <div className="divider"></div>
            <div className="grid h-18 card rounded-box place-items-center">
                <h1 className='font-bold mb-2'>Already have an account?</h1>
                <Link to="/sign-in" className='text-secondary'>Login instead</Link>
            </div>
        </div>

    </div>
  )
}

export default SignUpPage