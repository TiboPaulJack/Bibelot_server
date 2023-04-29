export default function UserDeleteConfirm({ setDeleteConfirm }) {
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(baseHost + `/user/delete`, {
      method: "DELETE",
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")} `,
      }
      }).then((res) => res.json()
      ).then((data) =>
      {
        console.log(data)
        if (data.status === 200) {
          localStorage.removeItem("token")
          window.location = "/"
        }
      })
    
  }
  
  
  
  return (
    <div className="userDeleteConfirm">
      
      <div className="userDeleteConfirm__title">Delete your Profile</div>
      <button className="userDeleteConfirm__close" onClick={() => setDeleteConfirm(false)}>
        X
      </button>
      <div className="userDeleteConfirm__form">
        <form className="userDeleteConfirmForm">
          <label>Username</label>
          <input type="text"
                 placeholder="Pseudo"
          />
          <label>Password</label>
          <input type="password"
                 placeholder="Password"
          />
          <button className="userDeleteConfirmForm__button"
                  onClick={handleSubmit}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
