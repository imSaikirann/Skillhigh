import React, { createContext, useState, useEffect } from "react";
import axios from "../auth/axiosConfig";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(null);
  const [selectedDepartmentCourses, setSelectedDepartmentCourses] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") !== null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/department/getDepartments");
      setCourses(response.data.departments);
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
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
