import baseHost from "../assets/baseHost.js";


export function tokenCheck () {
  console.log("tokenCheck");
  
  fetch(baseHost + "/user/check", {
    method: "POST",
    headers: {
      "authorization": "Bearer " + localStorage.getItem("token"),
    }
  }).then((response) => {
    if (response.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    if (response.status === 200) {
      return response.json()
    }
    })
}


