
import React, { createContext, useState } from 'react';
import axios from '../auth/axiosConfig'

export const AppContext = createContext();


export const AppProvider = ({ children }) => {

 const [courses,setCourses] = useState([])
 const [loading,setLoading] = useState(false)



const fetchCourses = async ()=>{
  try {
    const response = await axios.get('/api/v1/course/getAllCourse')
    setCourses(response.data)

  } catch (error) {
    console.log(error)
  }
 }



  const contextValue = {
   courses,
   loading,
   setLoading,






   fetchCourses
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children} 
    </AppContext.Provider>
  );
};
