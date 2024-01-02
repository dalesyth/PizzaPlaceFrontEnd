import { useState, useEffect } from "react";



export function useFetchData(apiFunction) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiFunction();
      setData(response);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, [apiFunction]);

  
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
}


