import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import baseHost from "../../assets/baseHost.js";

export default function ProductUpdate({ rendered, id }) {
  const logout = useContext(UserContext).logout;

  const updateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const filteredData = {};
    for (let [key, value] of formData.entries()) {
      if (value !== "") {
        filteredData[key] = value;
      }
    }

    console.log("filteredData", filteredData);
    
    
    /*const form = new URLSearchParams(filteredData);*/
    
    fetch(baseHost + `/model/${id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("token")} `,
      },
      body: JSON.stringify(filteredData),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        logout();
        window.location = "/";
      } else if (res.status !== 200) {
        console.error(`Error: ${res.message} `, res.status);
      }
    });
    rendered("UserProducts");
  };

  return (
    <div className="productUpdate">
      <div className="userpage__title">ProductUpdate</div>
      <button
        className="productAdd__close"
        onClick={() => rendered("UserProducts")}
      >
        X
      </button>
      <form className="productAdd__form" onSubmit={updateProduct}>
        <label>Product Name</label>
        <input type="text" placeholder="Product Name" name="name" />
        <label>Product Description</label>
        <input
          type="text"
          placeholder="Product Description"
          name="description"
        />
        <label>Is available to download ?</label>
        <select name="download">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Tags</label>
        <input type="text" placeholder="Tags" name="tags" />
        <button className="productAdd__button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
