import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword,getRedirectResult, signInWithRedirect, GoogleAuthProvider  } from "firebase/auth";
import SiteContext from '../contexts/SiteContext';
import {GoogleButton} from "react-google-button"
import Spinner from '../components/Spinner';


function SignInPage() {
    const auth = getAuth()
    const navigate = useNavigate()
    const {currentUser, retrieveProgress, setCurrentUser, visitedSite, isLoading, setIsLoading} = useContext(SiteContext)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const provider = new GoogleAuthProvider();
    const signInWithEmail = async () => {
        // console.log(auth, userEmail, userPassword)
        await signInWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setCurrentUser(user)
            console.log("user: ", user, "currentUser: ", currentUser);
            retrieveProgress(user)
            console.log("visitedSite: ", visitedSite);
            navigate('/site')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
    } 
    
    const loginWithGoogleRedirect = () =>{
        signInWithRedirect(auth, provider);
        setIsLoading(true)
        console.log("loading state: ", isLoading);
    }


    useEffect(()=>{
        const handleGetRedirectResult = async () => {
            const result = await getRedirectResult(auth);
            if(result) {
                navigate('/site')
            }
        }
        return () =>{
            handleGetRedirectResult()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    (isLoading) ? <Spinner/>
    :
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-28 card rounded-box place-items-center my-3'>
                <button className="mt-6" onClick={loginWithGoogleRedirect}>
                    <GoogleButton/>
                </button>
            </div>
            <div className="divider">OR</div>
            <div className="grid h-56 card rounded-box place-items-center my-1">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" onChange={(event) => setUserEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" onChange={(event) => setUserPassword(event.target.value)}/>
                </div>
                <button className="btn btn-wide btn-primary my-2" onClick={signInWithEmail}>Log In</button>
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