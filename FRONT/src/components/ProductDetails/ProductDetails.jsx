import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import ViewerGlb from "../Viewer/ViewerGlb.jsx";
import './productDetails.css'
import ProductComments from "../ProductComments/ProductComments.jsx";
import { useEffect, useState } from "react";
import BaseHost from "../../assets/baseHost.js";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import { tokenCheck } from "../../utils/TokenCheck.js";


export default function ProductDetails() {
  
  
  const [productDetail, setProductDetail] = useState( [] );
  const [isLoaded, setIsLoaded] = useState( true );
  const [modelFormat, setModelFormat] = useState( "model/obj" );
  
  const setLoaded = () => {
    setIsLoaded( false )
  }
  
  const { name, format, download, size, description, pseudo, likes, comments, tags } = productDetail;
  
  
  
  const id = useParams().id;
  
  useEffect( () => {
    productDetails()
  }, [] )
  
  useEffect( () => {
    console.log('format formMAT FORMAT', modelFormat)
  }, [modelFormat, setModelFormat] )
  
  
  
  const productDetails = () => {
    fetch( BaseHost + `/model/data/${ id }`, {
      method: "GET",
    } ).then( ( res ) => res.json()
    ).then( ( data ) => setProductDetail( data ) )
      .finally( () => { setModelFormat( format ) } )
  }
  
  console.log("PRODUCT DETAILS", productDetail)
  const bitesToMb = (bites) => {
    return Math.round(bites / 1000000)
  }
  
  return (
    <>
      <Header />
      <div className="productDetails">
        <div className="productDetails__top">
          <div className="model3d" id="canvasContainer">
            <div className="loaderDiv" id="loader">
              {
                !isLoaded &&
                <Loader />
              }
            </div>
            {isLoaded &&
              <ViewerGlb modelFormat={modelFormat}
                      setLoaded={setLoaded}
              />
            }
          </div>
          <div className="productDetails__infos">
            <div className="infos__author">
              Author
              <span className="infos__author--content">{pseudo}</span>
            </div>
            <div className="infos__format">
              Format
              <span className="infos__format--content">{format}</span>
            </div>
            <div className="infos__size">
              Size
              <span className="infos__size--content">{bitesToMb(size)}Mo</span>
            </div>
            <div className="infos__download">
              Download
              <span className="infos__download--content">
                {{ download } ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        <div className="box-likes">likes</div>
        <div className="productDetails__middle">
          <div className="productDetails__title">
            <h4>{name}</h4>
          </div>
          <div className="productDetails__description">
            Description
            <p>{description}</p>
          </div>
        </div>
        <div className="productDetails__bottom">
          <div className="bottom__comments">
            <ProductComments />
          </div>
          <div className="bottom__tags"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};
