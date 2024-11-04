import AddCourse from "./pages/AddCourse"
import Sidebar from "./pages/Sidebar"
import { Route,Routes } from 'react-router-dom'

function App() {


  return (
    <div>
      <Sidebar/>
     <Routes>
      <Route path="/" element={<AddCourse/>}></Route>
     </Routes>
    </div>
  )
}

export default App
