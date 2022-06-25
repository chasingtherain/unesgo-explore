import React, { createContext, useContext, useEffect, useState } from 'react'
import unescoSiteData from '../unescoSiteData'
import { db } from '../firebase-config';
import { current } from 'daisyui/src/colors';
import { getAuth, signOut, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SiteContext = createContext()

const provinceData = ["All Province / Region","Anhui","Beijing",  "Chongqing",  "Fujian",  "Gansu",  "Guangdong",  "Guangxi",  "Guizhou",  "Hainan",  "Hebei",  "Heilongjiang",  "Henan",  "Hong Kong",  "Hubei",  "Hunan",  "Inner Mongolia",  "Jiangsu",  "Jiangxi",  "Jilin",  "Liaoning",  "Macau",  "Ningxia",  "Qinghai",  "Shaanxi",  "Shandong",  "Shanghai",  "Shanxi",  "Sichuan",  "Tianjin","Tibet",  "Xinjiang","Yunnan","Zhejiang"]

export const SiteContextProvider = ({children}) => {
    const [selectedProvince, setSelectedProvince] = useState("All Province / Region")
    const [provinceSite, setProvinceSite] = useState((unescoSiteData.map(site => site)))
    const [visitedSite, setVisitedSite] = useState([])
    const [currentUser, setCurrentUser] = useState("")
    
    // auth related state
    const auth = getAuth()
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const getEmailInput = (event) => {setUserEmail(event.target.value);}
    const getPasswordInput = (event) => { setUserPassword(event.target.value);}

    const handleSelectProvince = (event) => {
        setSelectedProvince(event.target.value);
        
        if(event.target.value === "All Province / Region"){setProvinceSite(unescoSiteData.map(site => site))}
        else{ setProvinceSite(unescoSiteData.filter(object => object["admin_region"] === event.target.value))}
      }
    
    
    const removeSiteFromList = (site) => {
        let removedSiteIndex = visitedSite.indexOf(site)
        let tempVisitedSite = visitedSite.slice(0,removedSiteIndex).concat(visitedSite.slice(removedSiteIndex+1))
        setVisitedSite(tempVisitedSite)
    }

    // auth related methods
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setCurrentUser(user)
          //console.log(currentUser);
        } else {
          // User is signed out
          setCurrentUser("")
        }
      });

    // fetch user progress if user is logged in
    // useEffect(() => {
    //     if(currentUser) {
    //         try {
    //             const retrieveProgress = async () => {
    //                 const docRef =  doc(db, "users", currentUser.uid);
    //                 const docSnap = await getDoc(docRef);
    //                 const userProgress = docSnap.data().progress
    //                 console.log(userProgress);
    //                 // setVisitedSite(userProgress)
    //             }
    //             retrieveProgress()
    
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // update user progress
    // useEffect(() => {
    //     if(currentUser){
    //         try {
    //             // update db whenever visitedSite is updated
    //             const docRef = doc(db, "users", currentUser.uid);        
    //             // To update progress
    //             updateDoc(docRef, {
    //                 "progress": visitedSite
    //             });
    //             console.log("user logged in, new data added!");
    //         } catch (error) {
    //             console.log(error);
    //             console.log("can't add data, not logged in");
    //         }
            
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[visitedSite])

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

    return <SiteContext.Provider value={{
        currentUser,
        provinceData,
        provinceSite,
        selectedProvince,
        visitedSite,
        userEmail,
        userPassword,
        signOutCurrentUser,
        handleSelectProvince,
        removeSiteFromList,
        setCurrentUser,
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