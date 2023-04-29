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

export default function UserPage() {
  
  const { logout } = useContext(UserContext);
  
  
  useEffect(() => {
    fetch(baseHost + `/user/info`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")} `,
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        logout()
        window.location = "/";
      }
    }).then((data) => {
      data.userProfil.picture = bufferToUrl(data.userProfil.picture.data)
      setUserData(data.userProfil);
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  
  const [userData, setUserData] = useState({});
  const [userProducts, _] = useState([]);
  const [rendered, setRendered] = useState("UserProducts");
  
  const handleRendered = (componentName) => {
    setRendered(componentName);
    console.log(rendered)
  }
  //TODO: REFACTOR THIS COMPONENT TO USE THE CONTEXT API
  return (
    <>
      <Header />
      <div className="userPage">
        <UserBanner rendered={handleRendered}
                    userData={userData}
        />
        <div className="userPage__main">
          {rendered === "UserProducts"
            &&
            <UserProducts rendered={handleRendered}
                          userProducts={userProducts}
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
            <ProductUpdate rendered={handleRendered} />}
        </div>
      </div>
      <Footer />
    </>
  );
}
