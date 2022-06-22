import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthContextProvider} from "./contexts/AuthContext";
import CountrySiteList from "./components/CountrySiteList";
import { SiteContextProvider } from "./contexts/SiteContext";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <SiteContextProvider>
        <AuthContextProvider>
          <Router>
            <NavBar/> 
            <Routes>
              <Route exact path = '/' element={<LandingPage/>}/>
              <Route path = '/*' element={<NotFound/>}/>
              <Route path = "/site" element={<CountrySiteList/>}/>
            </Routes>
          </Router>
          <Footer/>
        </AuthContextProvider>
      </SiteContextProvider>
    </div>
  );
}

export default App;
