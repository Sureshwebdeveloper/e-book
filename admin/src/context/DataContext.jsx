import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading,setLoading] = useState(false);
  const [update, setUpdate] = useState([]);
  const url = "http://localhost:2000/api";

  const fetchData = async () => {
    setLoading(true)
    const response = await axios.get(`${url}/get-books`);
    if (response.data.success) {
      setLoading(false)
      setData(response.data.data);
    } else {
      setLoading(false)
      toast.error("Error");
    }
  };

  const contextValue = {
    url,
    token,
    setToken,
    authenticated,
    setAuthenticated,
    loading,setLoading,
    fetchData,
    data,
    setData,
    update,
    setUpdate,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
