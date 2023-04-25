import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import './productPage.css'
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import ProductList from "../ProductList/ProductList.jsx";


export default function ProductPage() {

    return (
      <>
        <Header />
          <div className="productPage">
            <ProductFilter />
            <ProductList />
          </div>
        <Footer />
      </>


    )
}
