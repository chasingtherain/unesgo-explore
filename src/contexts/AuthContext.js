import { createContext, useEffect, useState, useReducer } from "react";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
export const AuthContext = createContext()

export const authReducer = (state,action) => {
    switch (action.type){
        case "SIGNUP":
            return {...state, user: action.payload}
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null}
        case "AUTH_IS_READY":
            return {...state, user: action.payload,authIsReady: true}
        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [googleLoading, setGoogleLoading] = useState(false)
    const googleProvider = new GoogleAuthProvider();

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    const loginWithGoogleRedirect = () =>{
        setGoogleLoading(true)
        signInWithRedirect(auth, googleProvider);
    }

    useEffect( ()=>{
        console.log("state = unknown (until the callback is invoked)")  
        const unsub = auth.onAuthStateChanged((user) => {
            
            dispatch({type: "AUTH_IS_READY", payload: user})
            if(user) console.log("state = definitely signed in")
            else console.log("state = definitely signed out")
        })      
        unsub()
    },[])

    console.log("Authcontext state: ", state.user);

    return(
        <AuthContext.Provider value={{...state, dispatch,googleLoading, loginWithGoogleRedirect}}>
            {children}
        </AuthContext.Provider>
    )
}