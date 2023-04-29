import { useState } from "react";
import UserProductList from "./UserProductList.jsx";
import ProductDeleteConfirm from "../ProductUpdate/ProductDeleteConfirm.jsx";


export default function UserProducts({ rendered }) {
  
  const [DeleteConfirm, setDeleteConfirm] = useState(false)
  
    return (
      <div className="">
        <div className="userProducts">
          <h5>Your Models</h5>
          <h6 onClick={() => rendered("ProductAdd")}>Add new model</h6>
          {
            DeleteConfirm
            ?
              <ProductDeleteConfirm setDeleteConfirm={setDeleteConfirm}/>
              :
              <UserProductList
                setDeleteConfirm={setDeleteConfirm}
                rendered={rendered}
              />
          }
          
          
        </div>
      </div>
    );
}
