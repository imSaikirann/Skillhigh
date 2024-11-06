import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"

import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import Aboutus from "./pages/Aboutus"
function App() {


  return (
   <div className="px-2 sm:px-[2vw] md:px-[4vw] lg:px-[6vw]">
    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/aboutus" element={<Aboutus/>}>



      </Route>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App
