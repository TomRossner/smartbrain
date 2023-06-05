// IMPORTS
import Nav from "./components/Nav";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import SignIn from "./components/pages/SignIn";
import Logout from "./components/pages/Logout";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";

import { Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

// STYLES
import "./styles/global-styles.scss";
import "./styles/nav.scss";
import "./styles/home.scss";
import "./styles/footer.scss";
import "./styles/auth.scss";
import "./styles/bounding-box.scss";
import "./styles/profile.scss";
import "./styles/animations.scss";
import "./styles/media-queries.scss";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  const {currentUser} = useAuth();

  return (
    <div className="app-container">
        <Nav/>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home/>}/>}/>
          {!currentUser
          ? (
            <>
              <Route path="/sign-in" element={<SignIn/>}/>
              <Route path="/register" element={<Register/>}/>
            </>
          ) : (
            <>  
              <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}/>
              <Route path="/logout" element={<ProtectedRoute element={<Logout/>}/>}/>
            </>
          )}
        </Routes>
        <div className="space"/>
        <Footer/>
    </div>
  )
}

export default App;