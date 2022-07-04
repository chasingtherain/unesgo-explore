import React, { createContext, useContext, useEffect, useState } from 'react'
import unescoSiteData from '../unescoSiteData'
import { auth, db } from '../firebase-config';
import { current } from 'daisyui/src/colors';
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';


const SiteContext = createContext()


export const SiteContextProvider = ({children}) => {
    const [selectedProvince, setSelectedProvince] = useState("All Province / Region")
    const [provinceSite, setProvinceSite] = useState((unescoSiteData.map(site => site)))
    const [visitedSite, setVisitedSite] = useState([])
    const [currentUser, setCurrentUser] = useState("")
    const [isLoading, setIsloading] = useState(false)
    
    // const provider = new GoogleAuthProvider();
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const getEmailInput = (event) => {setUserEmail(event.target.value);}
    const getPasswordInput = (event) => { setUserPassword(event.target.value);}    


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setCurrentUser(currentUser)
            userNotInDb(currentUser)
            retrieveProgress(currentUser)
            setIsloading(false)   
        })
        return () => {
            unsubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    
    // fetch user progress if user is logged in
    const retrieveProgress = async (user) => {
        const docRef =  doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userProgress = docSnap.data().progress
        console.log(userProgress);
        setVisitedSite(userProgress)
    }

    const userNotInDb = async (user) => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document already exist! user data:", docSnap.data());
        } 
        else {
            console.log("No such document!");
            const newUser = {
                email: user.email,
                timestamp: new Date(),
                progress: []
            }
            setDoc(doc(db, "users", user.uid), newUser);
            console.log("new user data added to db");
        }
    }



    // update user progress
    const updateUserProgress = (visitedSiteList) => {
        const docRef = doc(db, "users", currentUser.uid);        
                    // To update progress
                    updateDoc(docRef, {
                        "progress": visitedSiteList
                    });
                    console.log("user logged in, new data added!");
    }


    return <SiteContext.Provider value={{
        currentUser,
        provinceSite,
        isLoading,
        selectedProvince,
        userEmail,
        userPassword,
        visitedSite,
        // loginWithGoogleRedirect,
        retrieveProgress,
        updateUserProgress,
        setCurrentUser,
        setIsloading,
        setProvinceSite,
        setSelectedProvince,
        setVisitedSite,
        getEmailInput,
        getPasswordInput,
        setUserEmail,
        setUserPassword,
    }}>
        {children}
    </SiteContext.Provider>
}

export default SiteContext