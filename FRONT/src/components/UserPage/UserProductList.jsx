import baseHost from "../../assets/baseHost.js";
import { useState } from "react";


export default function UserProductList ({rendered, name, id, setSelectedId }) {
  
  
  
  
  const handleEdit = () => {
    rendered("ProductUpdate")
    setSelectedId(id)
  }
  
  const handleDelete = (id) => {
    rendered("ProductDelete")
    setSelectedId(id)
  }
  
  
  
  return (
    <div className="userProducts__list">
      <div className="userProducts__item">
        <span className="userProducts__item__name">{name}</span>
        <span className="userProducts__item__likes">TO PLUG</span>
        <span className="userProducts__item__edit" onClick={handleEdit}>
                Edit</span>
        <span className="userProducts__item__delete"
              onClick={() => handleDelete(id)}
        >
                Delete</span>
      </div>
    </div>
  )
  
}
