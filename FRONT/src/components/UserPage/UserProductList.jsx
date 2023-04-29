


export default function UserProductList ({ setDeleteConfirm, rendered}) {
  
  return (
    <div className="userProducts__list">
      <div className="userProducts__item">
        <span className="userProducts__item__name">Model 1</span>
        <span className="userProducts__item__likes">250</span>
        <span className="userProducts__item__edit" onClick={() => rendered("ProductUpdate")}>
                Edit</span>
        <span className="userProducts__item__delete"
              onClick={() => setDeleteConfirm(true)}
        >
                Delete</span>
      </div>
    </div>
  )
  
}
