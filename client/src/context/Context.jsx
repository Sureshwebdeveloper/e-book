import axios from "axios";
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // for get all book data
  const [data, setData] = useState([]);
  // save token
  const [token, setToken] = useState("");
  // save user cart item
  const [cartItem, setCartItem] = useState({});
  // for User Login Logout State
  const [signState, setSignState] = useState("Sign In");
  // Is Authenticated
  const [isAuthendicated, setisAuthendicated] = useState(false);
  // Fetching Time Loading
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:2000/api";

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(`${url}/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(`${url}/get-books`);
    try {
      if (response.data.success) {
        setLoading(false);
        setData(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        // For Load A User Cart Data
        await loadCartData(localStorage.getItem("token"));
      }
      // For Get Books
      await fetchData();
    }
    loadData();
  }, []);

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = data.find((product) => product._id === item);
        if (itemInfo && typeof itemInfo.price === "number") {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    url,
    data,
    setData,
    fetchData,
    token,
    setToken,
    loading,
    setLoading,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalAmount,
    signState,
    setSignState,
    isAuthendicated,
    setisAuthendicated,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
