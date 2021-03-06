import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth";
import {GoogleButton} from "react-google-button"
import Footer from '../components/Footer';
import { auth } from '../firebase-config';
import { useAuthContext } from '../hooks/useAuthContext';


function SignInPage() {
    const navigate = useNavigate()
    const {dispatch, googleLoading, loginWithGoogleRedirect} = useAuthContext()
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")
    const [loginBtnLoading, setLoginBtnLoading] = useState("")


    const signInWithEmail = async () => {
        setLoginBtnLoading("loading")
        await signInWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch({type: "LOGIN", payload: user})
            navigate('/')
          })
          .catch((error) => {
            const errorCode = error.code;
            setError(errorCode)
          });
          setLoginBtnLoading("")
    } 
    
    return (
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-24 card rounded-box place-items-center'>
                <button onClick={loginWithGoogleRedirect}>
                    <GoogleButton/>
                </button>
                {/* to be implemented in future */}
                {/* <button className='btn' onClick={loginWithFacebookRedirect}> Continue with Facebook </button> */}
            </div>
            {googleLoading && <button className="btn loading btn-xs btn-outline btn-secondary">Pending Google to respond</button>}
            <div className="divider">OR</div>
            <div className="grid h-58 card rounded-box place-items-center my-1">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" onChange={(event) => setUserEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" onChange={(event) => setUserPassword(event.target.value)}/>
                </div>
                <button className={`btn btn-wide btn-primary my-2 ${loginBtnLoading}`} onClick={signInWithEmail}>LOGIN</button>
                {error && 
                    <>
                        <p className='text-red-600'>Invalid email or password.</p>
                        <p className='text-red-600'>Sign up below if you haven done so.</p>
                    </>
                }
                
                <Link to="/forgot-password" className='text-secondary'>Forgot password?</Link>
            </div>
            <div className="divider"></div>
            <div className="grid h-18 card rounded-box place-items-center">
                <button className="btn btn-wide btn-secondary">
                    <Link to="/sign-up">Create an account</Link>
                </button>
            </div>
        </div>
        <Footer/>
    </div>
    )
}

export default SignInPage