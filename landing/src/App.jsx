import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Course from "./pages/Course";
import Privacy from "./pages/Privacy";
// import DepartmentsList from "./pages/DepartmentsList";
import AllCourses from "./pages/AllCourses";
import TermsAndConditions from "./pages/Terms&Conditions";
import CheckoutPage from "./pages/Checkout";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
 

  return (
    <div className="px-2 sm:px-[2vw] md:px-[4vw] lg:px-[6vw]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        {/* <Route path="/d" element={<DepartmentsList />} /> */}
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/course/checkout/:id" element={<CheckoutPage />} />

      
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />

        
        <Route path="*" element={<Signin />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
