import "./userUpdate.css"
import { useContext, useState } from "react";
import UserUpdateForm from "./UserUpdateForm.jsx";
import UserDeleteConfirm from "./UserDeleteConfirm.jsx";
import baseHost from "../../assets/baseHost.js";
import { UserContext } from "../../App.jsx";


export default function UserUpdate({ rendered, userData }) {
  
  const { logout } = useContext(UserContext)
  const [DeleteConfirm, setDeleteConfirm] = useState(false)
  const [_, setForm] = useState({})
  
  const setFormData = (formData) => {
    setForm(formData)
  }
  
  const UpdateUser = (formData) => {
    
    if (Object.entries(formData).length === 0) {
      return  console.log("no change");
    }
    
    console.log("formData before", formData)
    
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    
    fetch(baseHost + `/user/update`, {
      method: "PATCH",
      body: form,
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")} `,
      },
    }).then((res) => {
      if (res.status === 401 ) {
        logout()
      }
      else if(res.status !== 200){
        console.error(res.status, res.message)
        return
      }
      window.location.reload()
    } )
  }
  
  
  return (
    <div className="userUpdate">
      {
          DeleteConfirm
          ?
          <UserDeleteConfirm setDeleteConfirm={setDeleteConfirm} />
          :
          <UserUpdateForm rendered={rendered}
                          setDeleteConfirm={setDeleteConfirm}
                          userData={userData}
                          setFormData={setFormData}
                          formData={_}
                          UpdateUser={UpdateUser}
          />
      }
      
   
    </div>
  );
}


