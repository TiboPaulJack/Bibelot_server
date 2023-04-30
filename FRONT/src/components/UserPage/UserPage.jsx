import "./userPage.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import UserBanner from "./UserBanner.jsx";
import UserProducts from "./UserProducts.jsx";
import { useContext, useEffect, useState } from "react";
import UserUpdate from "../UserUpdate/UserUptate.jsx";
import ProductAdd from "../ProductAdd/ProductAdd.jsx";
import ProductUpdate from "../ProductUpdate/ProductUpdate.jsx";
import { UserContext } from "../../App.jsx";
import baseHost from "../../assets/baseHost.js";
import bufferToUrl from "../../utils/BufferToUrl.js";
import ProductDelete from "../ProductDelete/ProductDelete.jsx";

export default function UserPage() {
  
  const { logout } = useContext(UserContext);
  
  const [userData, setUserData] = useState({});
  const [userProducts, setUserProducts] = useState([]);
  const [rendered, setRendered] = useState("UserProducts");
  const [selectedId, setSelectedId] = useState(0)
  
  
  useEffect(() => {
    fetch(baseHost + `/user/info`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")} `,
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401 || res.status === 403 || res.status === 404) {
        logout()
        window.location = "/";
      }
    }).then((data) => {
      data.userProfil.picture = bufferToUrl(data.userProfil.picture.data)
      setUserData(data.userProfil);
      setUserProducts(data.allModel);
    }).catch((error) => {
      console.error(error);
    });
    console.log('FETCHED USER DATA')
  }, []);
  
  
  
  const handleSelectedId = (id) => {
    setSelectedId(id);
    console.log("selectedId",selectedId)
  }
  const handleRendered = (componentName) => {
    setRendered(componentName);
  }
  //TODO: REFACTOR THIS COMPONENT TO USE THE CONTEXT API
  return (
    <>
      <Header rendered={handleRendered} />
      <div className="userPage">
        <UserBanner rendered={handleRendered}
                    userData={userData}
        />
        <div className="userPage__main">
          {rendered === "UserProducts"
            &&
            <UserProducts rendered={handleRendered}
                          setRendered={setRendered}
                          userProducts={userProducts}
                          setUserProducts={setUserProducts}
                          setSelectedId={handleSelectedId}
            />}
          {rendered === "UserUpdate"
            &&
            <UserUpdate rendered={handleRendered}
                        userData={userData}
            />}
          {rendered === "ProductAdd"
            &&
            <ProductAdd rendered={handleRendered} />}
          {rendered === "ProductUpdate"
            &&
            <ProductUpdate rendered={handleRendered}
                           id={selectedId}
            />
          }
          {rendered === "ProductDelete"
            &&
            <ProductDelete  rendered={handleRendered}
                            id={selectedId}
            />}
          
        </div>
      </div>
      <Footer />
    </>
  );
}
