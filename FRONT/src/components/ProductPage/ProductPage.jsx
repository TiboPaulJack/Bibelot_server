import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import './productPage.css'
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import ProductList from "../ProductList/ProductList.jsx";
import { useEffect, useState } from "react";
import BaseHost from "../../assets/baseHost.js";



export default function ProductPage() {
  
  const [categories, setCategories] = useState([]);
  
  
  useEffect(() => {
    fetch(BaseHost + '/category', {
      method: "GET",
    }).then((res) => res.json()
    ).then((data) => setCategories(data))
  }, []);
  
  
    return (
      <>
        <Header />
          <div className="productPage">
            <ProductFilter categories={categories} />
            <ProductList />
          </div>
        <Footer />
      </>


    )
}
