import React, { createContext, useState, useContext, useEffect } from 'react'
import { getAuth, signOut, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from "../firebase-config"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import { useNavigate } from 'react-router-dom';
import SiteContext from './SiteContext';

const AuthContext = createContext()
const auth = getAuth()

export const AuthContextProvider = ({children}) => {
    // const {visitedSite, setVisitedSite} = useContext(SiteContext)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const getEmailInput = (event) => {setUserEmail(event.target.value);}
    const getPasswordInput = (event) => { setUserPassword(event.target.value);}
    const [currentUser, setCurrentUser] = useState("")
    
    const googleRedirect = async () => {
        console.log("clicked");
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithRedirect(auth, provider);
            const user = result.user
            console.log("result: ", result)
            console.log(user);
            toast.success("log in via redirect is successful")
        } catch (error) {
            toast.error(("log in via redirect is unsuccessful"))
        }
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user)
        // getCurrentProgress(user)
        // ...
      } else {
        // User is signed out
        setCurrentUser("")
      }
    });
    
    // sign out user from platform
    const signOutCurrentUser = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            "sign out successful"
          }).catch((error) => {
            // An error happened.
            console.log("sign out was unsuccessful");
          });
    }

    return(
        <AuthContext.Provider value={{
            userEmail,
            userPassword,
            currentUser,
            // getCurrentProgress,
            getEmailInput,
            getPasswordInput,
            googleRedirect,
            setUserEmail,
            setUserPassword,
            setCurrentUser,
            signOutCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext