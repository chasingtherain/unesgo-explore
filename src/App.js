import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CountrySiteList from "./components/CountrySiteList";
import SignInPage from "./pages/SignInPage";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from 'react-toastify';
import { useAuthContext } from "./hooks/useAuthContext";
import Spinner from "./components/Spinner";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import ProvinceListPage from "./pages/ProvinceListPage";
import RegionPage from "./pages/RegionPage";


function App() {
    const {authIsReady} = useAuthContext()

    return (
      <div>
        {authIsReady && (
              <Router>
                <NavBar/> 
                <Routes>
                  <Route exact path = '/' element={<LandingPage/>}/>
                  <Route exact path = '/site' element={<CountrySiteList/>}/>
                  <Route exact path = '/east-asia' element={<RegionPage/>}/>
                  <Route exact path = '/southeast-asia' element={<RegionPage/>}/>
                  <Route exact path = '/province-list' element={<ProvinceListPage/>}/>
                  <Route path = '/sign-in' element={<PrivateRoute/>}>
                    <Route path = '/sign-in' element={<SignInPage/>}/>
                  </Route>
                  <Route path='/sign-up' element={<PrivateRoute/>}>
                    <Route path = '/sign-up' element={<SignUpPage/>}/>
                  </Route>
                  <Route path='/forgot-password' element={<PrivateRoute/>}>
                    <Route path = '/forgot-password' element={<ResetPassword/>}/>
                  </Route>
                  <Route path = '/*' element={<NotFound/>}/>
                </Routes>
              </Router>
        )}
        {!authIsReady && <Spinner/>}
        <ToastContainer/>
      </div>
    );
}

export default App;
