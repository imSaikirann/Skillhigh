import React, { createContext, useState,useEffect} from "react";
import axios from "../auth/axiosConfig";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [course, setCourse] = useState(null);
  const [departments,setDepartments] = useState([])
  const [selectedDepartmentCourses, setSelectedDepartmentCourses] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") !== null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [courses, setCourses] = useState([]);
 
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
    if (courses.length > 0) return; 
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/course/getAllCourse");
      setCourses(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
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
    departments
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
