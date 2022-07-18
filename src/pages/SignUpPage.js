import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../firebase-config"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import {GoogleButton} from 'react-google-button'
import Footer from '../components/Footer'
import { useAuthContext } from '../hooks/useAuthContext'
import { auth } from '../firebase-config'

function SignUpPage() {
    const {dispatch, googleLoading, loginWithGoogleRedirect} = useAuthContext()
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")
    const [signUpBtnLoading, setSignUpBtnLoading] = useState("")
    const navigate = useNavigate()



    const signUpWithEmail = async() => {
        setSignUpBtnLoading("loading")
        console.log("signing up with email");

        if(userPassword.length < 6){
            toast.error("Password needs to be at least 6 characters long!")
            setSignUpBtnLoading("")
        }
        else{
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch({type: "SIGNUP", payload: user})
            const newUser = {
                email: user.email,
                timestamp: new Date(),
                unescoListProgress: [],
                provinceListProgress: [],
            }
            setDoc(doc(db, "users", user.uid), newUser);
            toast("Sign Up Successful!")
            navigate("/")

        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            setSignUpBtnLoading("")
            if (errorCode === "auth/email-already-in-use") setError("Email already exists! Please log in")
            else toast.warning("Sign up with a valid email!")
        })}
        
    }

    return (
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-24 card rounded-box place-items-center'>
                <button onClick={loginWithGoogleRedirect}>
                    <GoogleButton label="Sign up with Google"/>
                </button>
                {/* to be implemented in future */}
                {/* <button className='btn'> Continue with Facebook </button> */}
            </div>
            {googleLoading && <button className="btn loading btn-xs btn-outline btn-secondary">Pending Google to respond</button>}
            <div className="divider">OR</div>
            <div className="grid h-56 card rounded-box place-items-center">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" onChange={(event) => setUserEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" onChange={(event) => setUserPassword(event.target.value)}/>
                </div>
                <button className={`btn btn-wide btn-primary my-2 ${signUpBtnLoading}`} onClick={signUpWithEmail}>SIGN UP</button>
                {error && <p className='text-red-400'>{error}</p>}

            </div>
            <div className="divider"></div>
            <div className="grid h-18 card rounded-box place-items-center">
                <Link to="/sign-in" className='text-secondary'>Login instead</Link>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default SignUpPage