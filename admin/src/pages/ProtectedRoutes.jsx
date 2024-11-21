import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "../auth/axiosConfig";

const ProtectedRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.removeItem("token"); // Clear invalid tokens
        navigate("/login", { replace: true }); // Navigate directly
        return; // Stop further execution
      }

      try {
        const response = await axios.post(
          "/api/checking",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.value) {
          setIsAuthenticated(true); // Valid token
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.error("Token validation failed", error);
        localStorage.removeItem("token");
        navigate("/login", { replace: true }); // Navigate directly
      } finally {
        setIsLoading(false); // Stop spinner
      }
    };

    validateToken();
  }, [navigate]);

  if (isLoading) {
    return <Spinner />; // Show spinner during token validation
  }

  // If not authenticated, show nothing (navigate already handled in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoutes;
