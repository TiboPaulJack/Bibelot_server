


export default function ProductDeleteConfirm({ setDeleteConfirm }) {
  
  return (
    <div className="productDeleteConfirm">
      <button
        className="deleteModelConfirm__close"
        onClick={() => setDeleteConfirm(false)}
      >
        X
      </button>
      <h6 className="productDeleteConfirm__title">This action is irreversible, by clicking on confirm, this model will by deleted</h6>
      <button className="productDeleteConfirm__close"
              onClick={() => setDeleteConfirm(false)}>
        DELETE MODEL
      </button>
    </div>
  )
}
