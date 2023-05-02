import Comment from "./Comment.jsx";
import './productComments.css'
import CommentAdd from "./CommentAdd.jsx";
import baseHost from "../../assets/baseHost.js";
import { useEffect, useState } from "react";


export default function ProductComments() {
  
 
  
  const [comments, setComments] = useState( [] );
  
  const freshComment = (comment) => {
    setComments([...comments, comment]);
  }
  
  
  useEffect(() => {
    getComments()
  }, [comments])
  
  const getComments = () => {
    fetch(baseHost + "/comments", {
      method: "GET",
    }).then((res) => res.json())
      .then((data) => setComments(data))
  }
  
  
  
  return (

    <section className="productComments">
      <CommentAdd />
      <div className="comment__list">
        {comments.map(comment => {
          return <Comment
            key={comment.id}
            comment={comment}
            freshComment={freshComment}
          />
        })
        }
      </div>
    </section>
  )
}
