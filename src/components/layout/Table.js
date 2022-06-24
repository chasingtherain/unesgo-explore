import TableRow from "./TableRow"
import SiteContext from "../../contexts/SiteContext"
import AuthContext from "../../contexts/AuthContext"
import { useContext, useEffect } from "react"
import { doc,getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

function Table() {
    const {provinceSite, selectedProvince} = useContext(SiteContext)
    const {currentUser} = useContext(AuthContext)
    const {visitedSite, setVisitedState} = useContext(SiteContext)

    // fetch user progress  
    

    useEffect(() => {
        const getDoc = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
         }
         getDoc()
        }, [currentUser])

    if(currentUser){
        console.log("user exists");
        getDoc()
    }

    // update user progress
    useEffect(() => {
        if(currentUser){
            // update db whenever visitedSite is updated
            const docRef = doc(db, "users", currentUser.uid);        
            // To update progress
            updateDoc(docRef, {
                "progress": visitedSite
            });
            console.log("user logged in, new data added!");
        }
        else console.log("can't add data, not logged in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[visitedSite])


    return (
    <div>
        <div className="overflow-x-auto">
            <table className="table table w-full">
            {/* <!-- head --> */}
            <thead>
                <tr>
                <th>
                    <label>
                    <input type="checkbox" className="checkbox" disabled={true} />
                    </label>
                </th>
                <th>Site Name</th>
                <th>Province / Region</th>
                </tr>
            </thead>
            <tbody>
                {/* <!-- row 1 --> */}
                {
                    provinceSite
                        .map((site,index) =>  <TableRow key={index} siteName={site.name} siteProvince={site.admin_region}/>)
                }
            </tbody>    
            </table>
        </div>
    </div>
    )
}

export default Table