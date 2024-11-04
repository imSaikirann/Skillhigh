import AddCourse from "./pages/AddCourse"
import Courses from "./pages/Courses"
import Sidebar from "./pages/Sidebar"
import { Route,Routes } from 'react-router-dom'

function App() {


  return (
    <div>
      <Sidebar/>
     <Routes>
      <Route path="/" element={<AddCourse/>}></Route>
      <Route path="/dashboard/courses" element={<Courses/>}></Route>

     </Routes>
    </div>
  )
}

export default App
