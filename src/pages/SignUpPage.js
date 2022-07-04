import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../firebase-config"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import {GoogleButton} from 'react-google-button'
import Footer from '../components/Footer'

function SignUpPage() {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()


    const signUpWithEmail = async() => {
        console.log("signing up with email");
        const auth = getAuth();

        if(userPassword.length < 6){
            toast.error("Password needs to be at least 6 characters long!")}
        else{
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const newUser = {
                email: user.email,
                timestamp: new Date(),
                progress: []
            }

            setDoc(doc(db, "users", user.uid), newUser);
            toast("sign up successful")
            navigate("/")

        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") setError("Email already exists! Please log in")
            else setError("Sign up with a valid email!")
        });}
    }

    return (
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-32 card rounded-box place-items-center my-3'>
                <button>
                    <GoogleButton label="Sign up with Google"/>
                </button>
                {/* to be implemented in future */}
                {/* <button className='btn'> Continue with Facebook </button> */}
            </div>
            <div className="divider">OR</div>
            <div className="grid h-56 card rounded-box place-items-center">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" onChange={(event) => setUserEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" onChange={(event) => setUserPassword(event.target.value)}/>
                </div>
                <button className="btn btn-wide btn-primary my-2" onClick={signUpWithEmail}>Sign Up</button>
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