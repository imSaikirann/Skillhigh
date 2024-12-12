import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './pages/Navbar'
import {Play }from "./pages/Play"
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {


  return (
    <BrowserRouter>
     <Navbar></Navbar>
     <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/play' element={<Play />}></Route>
        <Route path='/home' element={<Home/>}></Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App