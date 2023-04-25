import './App.css';
import HomePage from "./components/HomePage/HomePage.jsx";

import { Routes, Route } from "react-router-dom";
import {createContext, useState} from "react";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Auth from "./components/Connection/Auth.jsx";

function App() {

  const userContext = createContext({
    pseudo: "",
    logged : false,
    updateUser: () => {}
  });

  const [pseudo, setPseudo] = useState("");
  const [logged, setLogged] = useState(false);

  const updateUser = (newPseudo, newLogged) => {
    setPseudo(newPseudo);
    setLogged(newLogged);
  }


  return (
    <div className="App">
      <userContext.Provider value={{ pseudo, logged, updateUser }}>
        <Routes>
          <Route path="/model/:id" element={<ProductDetails/>} />
          <Route path="/models" element={<ProductPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </userContext.Provider>
    </div>
  )
}




export default App


