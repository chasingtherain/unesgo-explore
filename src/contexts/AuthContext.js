import React, { createContext, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../firebase-config"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const auth = getAuth()
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    
    const googleRedirect = async () => {
    
        console.log("clicked");
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithRedirect(auth, provider);
            const user = result.user
            console.log(user);
            toast.success("log in via redirect is successful")
        } catch (error) {
            toast.error(("log in via redirect is unsuccessful"))
        }
    }
    
    const signUpWithEmail = () => {
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
            console.log(user);
            toast("sign up successful")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });}
    }

    return(
        <AuthContext.Provider value={{
            googleRedirect,
            signUpWithEmail,
            setUserEmail,
            setUserPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext