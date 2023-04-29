
export default function UserUpdateForm({ rendered, userData, setDeleteConfirm, setFormData, formData, ...props }) {
  
  const updateUser = props.UpdateUser
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateUser(formData)
    
  }
  
  
  
  
  return (
    <>
      <div className="userUpdate__title">Edit your Profile</div>
      <button
        className="userUpdate__close"
        onClick={() => rendered("UserProducts")}
      >
        X
      </button>
      <div className="userUpdate__form">
        <form className="userEditForm" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text"
                 name="firstname"
                 placeholder={userData.firstname}
                 onChange={(e) => setFormData({...formData, firstname: e.target.value})}
          />
          <label>Lastname</label>
          <input type="text"
                 name="lastname"
                 placeholder={userData.lastname}
                 onChange={(e) => setFormData({...formData, lastname: e.target.value})}
          />
          
          <label>Username</label>
          <input type="text"
                 name="pseudo"
                 placeholder={userData.pseudo}
                 onChange={(e) => setFormData({...formData, pseudo: e.target.value})}
          />
          <label>Email</label>
          <input type="text"
                 name="email"
                 placeholder={userData.email }
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <label>Avatar Picture</label>
          <input type="file"
                 name="picture"
                 onChange={(e) => setFormData({...formData, picture: e.target.files[0]})}
          />
          {/*<label>Password</label>
          <input type="password"
                 name="password"
                 placeholder="Password"
          />
          <label>Password Confirm</label>
          <input type="password"
                 name="passwordConfirm"
                 placeholder="Password Confirm"
          />*/}
          <button className="userEditForm__button" type="submit">Update</button>
        </form>
      </div>
      <div className="userUpdate__delete">
        <button className="userUpdate__delete__button"
                onClick={() => setDeleteConfirm(true)}
        >
          Delete Profile
        </button>
      </div>
    </>
  );
}
