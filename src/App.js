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

function App() {
    const {authIsReady} = useAuthContext()

    return (
      <div>
        {authIsReady && (
              <Router>
                <NavBar/> 
                <Routes>
                  <Route exact path = '/' element={<CountrySiteList/>}/>
                  <Route path = '/sign-in' element={<SignInPage/>}/>
                  <Route path = '/sign-up' element={<SignUpPage/>}/>
                  <Route path = '/forgot-password' element={<ResetPassword/>}/>
                  <Route path = '/*' element={<NotFound/>}/>
                  {/* <Route path = "/site" element={<CountrySiteList/>}/> */}
                </Routes>
              </Router>
        )}
        {!authIsReady && <Spinner/>}
        <ToastContainer/>
      </div>
    );
}

export default App;
