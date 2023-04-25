import Comment from "./Comment.jsx";
import './productComments.css'
import CommentAdd from "./CommentAdd.jsx";


export default function ProductComments() {

  return (

    <section className="productComments">
      <CommentAdd />
      <div className="comment__list">
        <Comment />
      </div>
    </section>
  )
}
