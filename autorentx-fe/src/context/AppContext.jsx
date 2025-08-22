// context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // App state
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Search state
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Data
  const [cars, setCars] = useState([]);

  // --- helpers ---
  const applyAuthHeader = (jwt) => {
    if (jwt) axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    else delete axios.defaults.headers.common.Authorization;
  };

  const extractError = (err) =>
    err?.response?.data?.message || err?.message || "Something went wrong";

  // --- API calls (frontend) ---

  // Fetch current user (requires token)
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user/data");
      const ok = res.status === 200 && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to fetch user");
        navigate("/");
        return;
      }
      setUser(res.data.user);
      setIsOwner(res.data.user?.role === "owner");
    } catch (err) {
      toast.error(extractError(err));
      navigate("/");
    }
  };

  // Fetch cars (as exposed by your backend `/api/user/cars`)
  const fetchCars = async () => {
    try {
      const res = await axios.get("/api/user/cars");
      const ok = res.status === 200 && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to fetch cars");
        return;
      }
      setCars(res.data.cars || []);
    } catch (err) {
      toast.error(extractError(err));
    }
  };

  // Logout (frontend only; no backend route)
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    applyAuthHeader(null);
    toast.success("You have been logged out");
    navigate("/");
  };

  // --- effects ---

  // On mount: read token, apply header, fetch cars
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
      applyAuthHeader(stored);
    } else {
      applyAuthHeader(null);
    }
    fetchCars();
  }, []);

  // When token changes: set header and fetch user
  useEffect(() => {
    if (token) {
      applyAuthHeader(token);
      fetchUser();
    } else {
      applyAuthHeader(null);
    }
  }, [token]);

  // Public context value
  const value = {
    // libs
    axios,
    navigate,

    // settings
    currency,

    // auth
    token,
    setToken,
    user,
    setUser,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    logout,

    // data
    cars,
    setCars,
    fetchCars,

    // dates
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,

    // user fetch
    fetchUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
