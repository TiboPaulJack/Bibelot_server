import './productAdd.css'


export default function ProductAdd ({ rendered })  {
  
    return (
      <div className="productAdd">
        <button className="productAdd__close"
                onClick={() => rendered("UserProducts")}>
          X
        </button>
        <form className="productAdd__form">
          <label>Product Name</label>
          <input type="text" placeholder="Product Name" />
          <label>Product Description</label>
          <input type="text" placeholder="Product Description" />
          <label>Is available to download ?</label>
          <select>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Product Image</label>
          <input type="file" placeholder="Image" />
          <label>Product 3d File</label>
          <input type="file" placeholder="3D File" />
          <label>Tags</label>
          <input type="text" placeholder="Tags" />
          <button className="productAdd__button">Add</button>
        </form>
      
      </div>
    );
}

