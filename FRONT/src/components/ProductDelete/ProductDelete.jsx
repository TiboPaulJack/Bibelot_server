import baseHost from "../../assets/baseHost.js";
import { UserContext } from "../../App.jsx";
import { useContext } from "react";


export default function ProductDelete({ rendered, id }) {
  const { logout } = useContext(UserContext);

  const productDelete = (id) => {
    
    fetch(baseHost + `/model/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        logout();
        window.location = "/";
      }
    });
    rendered("UserProducts");
  };

  return (
    <div className="productDeleteConfirm">
      
      <button
        className="deleteModelConfirm__close"
        onClick={() => rendered("UserProducts")}
      >
        X
      </button>
      <span className="productDeleteConfirm__title">id:{id}</span>
      <h6 className="productDeleteConfirm__title">
        This action is irreversible, by clicking on confirm, this model will by
        deleted
      </h6>
      <button className="productDeleteConfirm__close" onClick={() => productDelete(id)}>
        DELETE MODEL
      </button>
    </div>
  );
}


