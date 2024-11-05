import Footer from "./components/Footer"

import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
function App() {


  return (
   <div className="px-2 sm:px-[2vw] md:px-[4vw] lg:px-[6vw]">
    <Navbar/>
    <Home/>
    <Footer/>
   </div>
  )
}

export default App
