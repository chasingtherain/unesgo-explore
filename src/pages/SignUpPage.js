import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../firebase-config"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import {GoogleButton} from 'react-google-button'
import AppleSignin from 'react-apple-signin-auth'
import Footer from '../components/Footer'

function SignUpPage() {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const navigate = useNavigate()


    const signUpWithEmail = async() => {
        console.log("signing up with email");
        const auth = getAuth();

        if(userPassword.length < 6){
            console.log("toasting in progress");
            toast.error("too short")}
        else{
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("result: ", userCredential)
            console.log(user);

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
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });}
    }

    return (
    <div>
        <div className="flex flex-col w-full border-opacity-50">
            <div className='grid h-32 card rounded-box place-items-center my-3'>
                <button>
                    <GoogleButton label="Sign up with Google"/>
                </button>
                <AppleSignin buttonExtraChildren="Sign in with Apple account" noDefaultStyle={false} />
            </div>
            <div className="divider">OR</div>
            <div className="grid h-56 card rounded-box place-items-center">
                <div className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" onChange={(event) => setUserEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-3" onChange={(event) => setUserPassword(event.target.value)}/>
                </div>
                <button className="btn btn-wide btn-primary my-2" onClick={signUpWithEmail}>Sign Up</button>
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