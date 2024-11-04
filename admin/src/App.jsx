import AddCourse from "./pages/AddCourse"
import AddTopic from "./pages/AddTopic"
import Courses from "./pages/Courses"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./pages/Sidebar"
import { Route,Routes } from 'react-router-dom'
import Topics from "./pages/Topics"

function App() {


  return (
    <div>
      <Sidebar/>
      <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/courses/add" element={<AddCourse/>}></Route>
      <Route path="/dashboard/courses" element={<Courses/>}></Route>
      <Route path="/courses/add-topic/:courseId" element={<AddTopic/>}></Route>
      <Route path="/dashboard/courses/:courseId" element={<Topics/>}></Route>



     </Routes>
    </div>
  )
}

export default App
