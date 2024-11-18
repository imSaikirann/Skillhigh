// StoreContext.js

import React, { createContext, useState } from 'react';
import axios from '../auth/axiosConfig';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(null);
  const [selectedDepartmentCourses, setSelectedDepartmentCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/v1/department/getDepartments');
      setCourses(response.data.departments);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  // New function to fetch courses by department ID
  const fetchCoursesByDepartmentId = async (departmentId) => {
    try {
      const response = await axios.get(`/api/v1/department/departments/${departmentId}`);
      console.log(response)
      setSelectedDepartmentCourses(response.data); // Update selected department courses
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch departments on mount
  React.useEffect(() => {
    fetchCourses();
  }, []);

  const contextValue = {
    courses,
    selectedDepartmentCourses,
    fetchCoursesByDepartmentId,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
  