


export default function ProductUpdate ({ rendered })  {
    
      return (
        <div className="productUpdate">
          <div className="userpage__title">ProductUpdate</div>
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
            <label>Tags</label>
            <input type="text" placeholder="Tags" />
            <button className="productAdd__button">Update</button>
          </form>
        </div>
      );
}
