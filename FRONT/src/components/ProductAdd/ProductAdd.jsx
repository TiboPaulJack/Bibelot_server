import './productAdd.css'
import BaseHost from "../../assets/baseHost.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App.jsx";


export default function ProductAdd ({ rendered })  {
  
  const [tags, setTags] = useState([]); // ["tag1", "tag2", "tag3"
  const [categories, setCategories] = useState([]);
  const { logout } = useContext(UserContext);
  
  useEffect(() => {
    fetch(BaseHost + '/category', {
      method: "GET",
    }).then((res) => res.json()
    ).then((data) => setCategories(data))
  }, []);
  
  
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
    formData.delete("tag");
    const formattedTags = `{${tags.join(',')}}`;
    formData.append("tag", formattedTags);
    console.log(formData.get("tag"))
    AddProduct(formData);
  }
  
  const handleTags = (e) => {
    const tagInput = document.getElementById("tag");
    setTags([...tags, tagInput.value]);
    console.log(tags)
    tagInput.value = "";
    
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
                 name="name"
                 required
          />
          <label>Category</label>
          <select name="category_id" id="category" required>
            <option value="all">All</option>
            {
              categories.map((category) => (
                <option key={ category.id } value={ category.id }>{ category.name }</option>
              ))
            }
          </select>
          <label>Product Description </label>
          <input type="text"
                 name="description"
                 required
          />
          <label>Is available to download ?</label>
          <select name="download" required>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Product Image</label>
          <input type="file"
                 name="picture"
                 required
          />
          <label>Product 3d File</label>
          <input type="file"
                 name="data"
                 required
          />
          <label>Tags</label>
          <div className="productAdd__tagsList">
          
          </div>
          <div className="box-tags">
            <input className='productAdd__tags'
                   id="tag"
                   type="text"
                   name="tag"
                   
            />
            <button className="addTag-button"
                    type="button"
                    onClick={handleTags}
            >
              Add
            </button>
          </div>
          <div className="productAdd__tag-list">
            {
              tags.map((tag, index) => (
                <span className="tag-item" key={index}>{tag}</span>
              ))
            }
          </div>
          <button className="productAdd__button" type="submit">Add</button>
        </form>
      
      </div>
    );
}

