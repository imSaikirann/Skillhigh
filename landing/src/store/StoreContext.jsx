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
  const [checkoutData,setCheckoutData] = useState(null)
  const [userData, setUserData] = useState({});

  
 
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


 
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/v1/profile/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data);
        
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };



  const contextValue = {
    courses,
    selectedDepartmentCourses,
    token,
    setToken,
    loading,
    error,
    fetchAllCourses ,
    fetchDepartments,
    departments,
    courseId,setCourseId,
    checkoutData,setCheckoutData,
    userData, 
    setUserData,
    fetchUserData
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
