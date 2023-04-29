import './productAdd.css'
import BaseHost from "../../assets/baseHost.js";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";


export default function ProductAdd ({ rendered })  {
  
  const { logout } = useContext(UserContext);
  
  const AddProduct = (formData) => {
    
    
    fetch(`${BaseHost}/model/add`, {
      method: "POST",
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")} `,
      },
      body: formData,
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        logout()
        window.location = "/";
      }})
    rendered("UserProducts")
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    AddProduct(formData);
    
    
  }
  

  
  
    return (
      <div className="productAdd">
        <button className="productAdd__close"
                onClick={() => rendered("UserProducts")}>
          X
        </button>
        <form className="productAdd__form" onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input type="text"
                 placeholder="Product Name"
                 name="name"
          />
          <label>Product Description</label>
          <input type="text"
                 placeholder="Product Description"
                 name="description"
          />
          <label>Is available to download ?</label>
          <select name="download">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Product Image</label>
          <input type="file"
                 placeholder="Image"
                 name="picture"
          />
          <label>Product 3d File</label>
          <input type="file"
                 placeholder="3D File"
                 name="data"
          />
          <label>Tags</label>
          <input type="text"
                 placeholder="Tags"
                 name="tag"
          />
          <button className="productAdd__button" type="submit">Add</button>
        </form>
      
      </div>
    );
}

