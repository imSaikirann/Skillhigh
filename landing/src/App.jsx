import Footer from "./components/Footer"
import Hero from "./components/Hero"
import { Navbar } from "./components/Navbar"
function App() {


  return (
   <div className="px-2 sm:px-[2vw] md:px-[4vw] lg:px-[6vw]">
    <Navbar/>
    <Hero/>
    <Footer/>
   </div>
  )
}

export default App
