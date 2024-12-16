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
  const [pricingList, setPricingList] = useState([]);

  
 
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
  
  useEffect(() => {
   
    fetchDepartments(); 
  }, []); 
  
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/department/getDepartments`);
      if (JSON.stringify(departments) !== JSON.stringify(response.data.departments)) {
        setDepartments(response.data.departments); 
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching departments:", err);
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

  
  useEffect(() => {
    fetchCourses();
  }, []);


 
  
    const fetchPricingData = async () => {
      try {
        const response = await axios.get('/api/v1/pricings/pricing');
        setPricingList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };


    useEffect(() => {
      fetchPricingData()
    }, []);

 

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
   
    pricingList
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
