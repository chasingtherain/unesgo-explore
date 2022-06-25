import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CountrySiteList from "./components/CountrySiteList";
import { SiteContextProvider } from "./contexts/SiteContext";
import Footer from "./components/Footer";
import SignInPage from "./pages/SignInPage";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <SiteContextProvider>
          <Router>
            <NavBar/> 
            <Routes>
              <Route exact path = '/' element={<LandingPage/>}/>
              <Route path = '/sign-in' element={<SignInPage/>}/>
              <Route path = '/sign-up' element={<SignUpPage/>}/>
              <Route path = '/forgot-password' element={<ResetPassword/>}/>
              <Route path = '/*' element={<NotFound/>}/>
              <Route path = "/site" element={<CountrySiteList/>}/>
            </Routes>
            <Footer/>
          </Router>
        <ToastContainer/>
      </SiteContextProvider>
    </div>
  );
}

export default App;
