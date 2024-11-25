import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../auth/axiosConfig";

const ProtectedRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.removeItem("token"); 
        navigate("/signup", { replace: true }); 
        return; 
      }

      try {
        const response = await axios.post(
          "/api/v1/profile/tokenChecking",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)

        if (response.data.value) {
          setIsAuthenticated(true); 
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.error("Token validation failed", error);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false); 
      }
    };

    validateToken();
  }, [navigate]);




  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoutes;