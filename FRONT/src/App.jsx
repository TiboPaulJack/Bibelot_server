import './App.css';
import HomePage from "./components/HomePage/HomePage.jsx";

import { Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Auth from "./components/Connection/Auth.jsx";


export const UserContext = createContext({
  user: '',
  userId: '',
  logged: false,
  setLogged: () => {},
  setPseudo: () => {},
  setUserId: () => {}
  
});

function App() {
  
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(null);
  const [logged, setLogged] = useState(false);

  return (
    <div className="App">
      <UserContext.Provider value={{
        user: user,
        setUser: setUser,
        logged: logged,
        setLogged: setLogged,
        userId: userId,
        setUserId: setUserId
      }}>
        <Routes>
          <Route path="/model/:id" element={<ProductDetails />} />
          <Route path="/models" element={<ProductPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}




export default App


