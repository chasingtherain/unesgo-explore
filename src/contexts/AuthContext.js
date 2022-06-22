import React, { createContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../firebase-config"
import { toast } from "react-toastify";

const AuthContext = createContext()

const onGoogleClick = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        const auth = getAuth()
        const provider = new GoogleAuthProvider()

        // Check for user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        // If user, doesn't exist, create user
        if (!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp(),
            })
        }
        toast.success("Logged in with Google successfully")
        // navigate('/')
    } catch (error) {
        toast.error('Could not authorize with Google')
    }
}

export const AuthContextProvider = ({children}) => {
    return(
        <AuthContext.Provider value={{
            onGoogleClick
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext