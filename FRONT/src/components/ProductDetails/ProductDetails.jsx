import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Viewer from "../Viewer/Viewer.jsx";
import './productDetails.css'
import ProductComments from "../ProductComments/ProductComments.jsx";


export default function ProductDetails() {

  return (

    <>
      <Header />
      <div className="productDetails">
        <div className="productDetails__top">
          <div className="model3d" id="canvasContainer">
            <div className='loaderDiv' id='loader'></div>
            <Viewer />
          </div>
          <div className="productDetails__infos">

            <div className="infos__author">Author
              <span className="infos__author--content">John</span>
            </div>
            <div className="infos__format">Format
              <span className="infos__format--content">.Glb</span>
            </div>
            <div className="infos__size">Size
              <span className="infos__size--content">240Mo</span>
            </div>
            <div className="infos__download">Download
              <span className="infos__download--content">Yes</span>
            </div>

          </div>

        </div>
          <div className="box-likes">likes</div>
        <div className="productDetails__middle">

          <div className="productDetails__title">
            <h4>Model Title</h4>
          </div>
          <div className="productDetails__description">Description
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>


        </div>
        <div className="productDetails__bottom">
          <div className="bottom__comments">
            <ProductComments />
          </div>
          <div className="bottom__tags">
          </div>

        </div>
      </div>
      <Footer />
    </>

  )
}
