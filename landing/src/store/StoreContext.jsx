import React, { createContext, useState,useEffect} from "react";
import axios from "../auth/axiosConfig";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [course, setCourse] = useState(null);
  const [departments,setDepartments] = useState([])
  const [selectedDepartmentCourses, setSelectedDepartmentCourses] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") !== null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [courses, setCourses] = useState([]);
  const [courseId,setCourseId] = useState(null)
 
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/department/getDepartments");
      setCourse(response.data.departments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCourses = async () => {
  
    try {
    
      const response = await axios.get("/api/v1/course/getAllCourse");
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
     console.log(err)
      setLoading(false);
    } 
  };
  
  const fetchDepartments = async () => {
    try {
    
      const response = await axios.get(`/api/v1/department/getDepartments`);
      setDepartments(response.data.departments)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 

  // Fetch courses by department ID
  const fetchCoursesByDepartmentId = async (departmentId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/department/departments/${departmentId}`);
      setSelectedDepartmentCourses(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sync token changes from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token") !== null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Initial fetch for courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const contextValue = {
    courses,
    selectedDepartmentCourses,
    fetchCoursesByDepartmentId,
    token,
    setToken,
    loading,
    error,
    fetchAllCourses ,
    fetchDepartments,
    departments,
    courseId,setCourseId
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
