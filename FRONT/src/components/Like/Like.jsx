import './like.css'
import baseHost from "../../assets/baseHost.js";
import { useContext, useState } from "react";
import { UserContext } from "../../App.jsx";


export default function Like ({ likes, isLoading, id , setLikesCount}) {
  
  const [isLiked, setIsLiked] = useState( false );
  const logged = useContext(UserContext)
  
  
  
  const like = () => {
    
    logged &&
    fetch(baseHost + `/likes/${id}`, {
      method: "POST",
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
      if (response.ok) {
       return response.json()
      }}).then((data) => {
        setIsLiked(data.liked)
        setLikesCount(data.total_likes.count)
    })
    }
    
  
  const handleClick = (e) => {
    console.log(id)
    like()
  }
  
  
  return (
    <div className="like__container">
      <div className="like__number">{isLoading ? "" : likes}</div>
      <div className="like__icon">
        <svg onClick={handleClick} className={
          isLoading ? "like__icon-svg isLoading" : isLiked ? "like__icon-svg liked" : "like__icon-svg"
        } viewBox="0 0 50 50" width="20px" height="20px">
          <path d="M 25 47 L 24.359375 46.472656 C 23.144531 45.464844 21.5 44.371094 19.59375 43.105469 C 12.167969 38.171875 2 31.417969 2 19.902344 C 2 12.789063 7.832031 7 15 7 C 18.894531 7 22.542969 8.722656 25 11.664063 C 27.457031 8.722656 31.105469 7 35 7 C 42.167969 7 48 12.789063 48 19.902344 C 48 31.417969 37.832031 38.171875 30.40625 43.105469 C 28.5 44.371094 26.855469 45.464844 25.640625 46.472656 Z"
          />
        </svg>
      </div>
    </div>
  );
  
  
}
