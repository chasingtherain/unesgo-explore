import React, { createContext, useEffect, useState } from 'react'
import unescoSiteData from "../data/chinaUnescoSiteData"
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import 'react-toastify/dist/ReactToastify.css'
import { collection, getDocs } from "firebase/firestore";

const SiteContext = createContext()



export const SiteContextProvider = ({children}) => {
    const provinceData = ["All Province / Region","Anhui","Beijing",  "Chongqing",  "Fujian",  "Gansu",  "Guangdong",  "Guangxi",  "Guizhou",  "Hainan", "Hebei",  "Heilongjiang",  "Henan",  "Hong Kong",  "Hubei",  "Hunan",  "Inner Mongolia",  "Jiangsu",  "Jiangxi",  "Jilin",  "Liaoning",  "Macau",  "Ningxia",  "Qinghai",  "Shaanxi",  "Shandong",  "Shanghai",  "Shanxi",  "Sichuan", "Taiwan", "Tianjin","Tibet",  "Xinjiang","Yunnan","Zhejiang"]
    const provinceList = ["Anhui","Beijing",  "Chongqing",  "Fujian",  "Gansu",  "Guangdong",  "Guangxi",  "Guizhou",  "Hainan", "Hebei",  "Heilongjiang",  "Henan",  "Hong Kong",  "Hubei",  "Hunan",  "Inner Mongolia",  "Jiangsu",  "Jiangxi",  "Jilin",  "Liaoning",  "Macau",  "Ningxia",  "Qinghai",  "Shaanxi",  "Shandong",  "Shanghai",  "Shanxi",  "Sichuan", "Taiwan", "Tianjin","Tibet",  "Xinjiang","Yunnan","Zhejiang"]
    
    const [selectedProvince, setSelectedProvince] = useState("All Province / Region")
    const [provinceSite, setProvinceSite] = useState((unescoSiteData.map(site => site)))
    const [visitedSite, setVisitedSite] = useState([])
    const [visitedProvinceList, setVisitedProvinceList] = useState([])
    const totalNumOfLocalSites = provinceSite.length
    
    // const provider = new GoogleAuthProvider();
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const getEmailInput = (event) => {setUserEmail(event.target.value);}
    const getPasswordInput = (event) => { setUserPassword(event.target.value);}    
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                userNotInDb(user)
                retrieveProgress(user) 
            }
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
        console.log(docSnap.data());
        setVisitedSite(docSnap.data().unescoListProgress)
        setVisitedProvinceList(docSnap.data().provinceListProgress)
    }

    const userNotInDb = async (user) => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document already exist! user data:", docSnap.data());
        } 
        else {
            console.log("No such document!");
            const newUser = {
                email: user.email,
                timestamp: new Date(),
                unescoListProgress: [],
                provinceListProgress: [],
            }
            setDoc(doc(db, "users", user.uid), newUser);
            console.log("new user data added to db");
        }
    }


    return <SiteContext.Provider value={{
        provinceData,
        provinceList,
        provinceSite,
        selectedProvince,
        userEmail,
        userPassword,
        totalNumOfLocalSites,
        visitedSite,
        visitedProvinceList,
        // loginWithGoogleRedirect,
        retrieveProgress,
        setProvinceSite,
        setSelectedProvince,
        setVisitedSite,
        getEmailInput,
        getPasswordInput,
        setUserEmail,
        setUserPassword,
        setVisitedProvinceList,
    }}>
        {children}
    </SiteContext.Provider>
}

export default SiteContext