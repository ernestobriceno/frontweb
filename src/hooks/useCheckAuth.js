import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";

export const useCheckAuth = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');
  
  const checkAuth = async () => {
    try {
      const resp = await fetch('https://apiweb-production.up.railway.app/auth/check', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await resp.json();

      if (data?.error) {
        setUser(null);
      } else {
        setUser(data?.user);
      }
    } catch (error) {
      // Handle error if needed
      console.error("Authentication check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [token]);

  return {
    user,
    loading,
  };
};
