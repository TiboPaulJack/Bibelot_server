import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import './App.css';
import HomePage from "./components/HomePage/HomePage.jsx";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Auth from "./components/Connection/Auth.jsx";
import UserPage from "./components/UserPage/UserPage.jsx";


export const UserContext = createContext({
  user: '',
  userId: 0,
  logged: false,
  setLogged: () => {},
  setPseudo: () => {},
  setUserId: () => {},
  logout: () => {}
  
});

function App() {
  
  
  
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogged(true);
    }else{
      setLogged(false);
    }
  })
  
  
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(0);
  const [logged, setLogged] = useState(false);
 
  
  const logout = () => {
    setLogged(false);
    setUser('');
    setUserId(null);
    localStorage.clear();
    window.location = "/";
  }
  console.log("id", userId)
  
  
  return (
    <div className="App">
      <UserContext.Provider value={{
        user: user,
        setUser: setUser,
        logged: logged,
        setLogged: setLogged,
        userId: userId,
        setUserId: setUserId,
        logout: logout
      }}>
        <Routes>
          <Route path="/model/:id" element={<ProductDetails />} />
          <Route path="/models" element={<ProductPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}




export default App


