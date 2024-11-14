import React from "react";
import { Route, Routes } from 'react-router-dom';
import AddCourse from "./pages/AddCourse";
import AddTopic from "./pages/AddTopic";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./pages/Sidebar";
import Topics from "./pages/Topics";
import Departments from "./pages/Departments";
import AddQuiz from "./pages/AddQuiz";
import Projects from "./pages/Projects";

function App() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/addcourses/:departmentId" element={<AddCourse />} />
        <Route path="/dashboard/courses/:departmentId" element={<Courses />} />

        <Route path="/courses/add-topic/:courseId" element={<AddTopic />} />
        <Route path="/dashboard/topics/:courseId" element={<Topics />} />
        <Route path="/dashboard/departments" element={<Departments />} />
        <Route path="/dashboard/departments/courses/topic/:topicId" element={<AddQuiz />} />
        <Route path="/dashboard/courses/projects/:courseId" element={<Projects/>} />


      </Routes>
    </div>
  );
}

export default App;
