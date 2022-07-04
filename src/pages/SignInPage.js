import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword,getRedirectResult, signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";
import {GoogleButton} from "react-google-button"
import Footer from '../components/Footer';
import { useSiteContext } from '../hooks/useSiteContext';
import { auth } from '../firebase-config';


function SignInPage() {
    const navigate = useNavigate()
    const {retrieveProgress, setCurrentUser} = useSiteContext()
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const signInWithEmail = async () => {
        await signInWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setCurrentUser(user)
            retrieveProgress(user)
            navigate('/')
          })
          .catch((error) => {
            const errorCode = error.code;
            setError(errorCode)
          });
    } 
    
    const loginWithGoogleRedirect = () =>{
        signInWithRedirect(auth, googleProvider);
    }

    // const loginWithFacebookRedirect = () =>{
    //     console.log("FB redirect clicked");
    //     signInWithRedirect(auth, facebookProvider);
    // }

    useEffect(()=>{
        const handleGetRedirectResult = async () => {
            const result = await getRedirectResult(auth);
            console.log(result.user);
            if(result) {
                navigate('/')
            }
        }
        return () =>{
            handleGetRedirectResult()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-32 card rounded-box place-items-center my-3'>
                <button onClick={loginWithGoogleRedirect}>
                    <GoogleButton/>
                </button>
                {/* to be implemented in future */}
                {/* <button className='btn' onClick={loginWithFacebookRedirect}> Continue with Facebook </button> */}
            </div>
            <div className="divider">OR</div>
            <div className="grid h-58 card rounded-box place-items-center my-1">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" onChange={(event) => setUserEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" onChange={(event) => setUserPassword(event.target.value)}/>
                </div>
                <button className="btn btn-wide btn-primary my-2" onClick={signInWithEmail}>Log In</button>
                {error && <p className='text-red-600'>Invalid email or password</p>}
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