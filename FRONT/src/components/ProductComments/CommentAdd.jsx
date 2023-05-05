import baseHost from "../../assets/baseHost.js";
import { tokenCheck } from "../../utils/TokenCheck.js";
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function CommentAdd({ freshComment }) {
  const [newComment, setNewComment] = useState({});

  const modelId = useParams().id;

  const addComment = () => {
    console.log("modelid", modelId);
    fetch(baseHost + "/comments", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newComment.content,
        model_id: newComment.model_id,
      }),
    }).then((res) => {
      if (res.status === 201) {
        freshComment(newComment);
        setNewComment({});
        return res.json();
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ [name]: value, model_id: modelId });
  };

  return (
    <div className="commentAdd">
      <div className="commentAdd__avatar">
        <img src="https://via.placeholder.com/150" alt="avatar" />
      </div>
      <div className="commentAdd__input">
        <input
          type="text"
          name="content"
          onChange={handleInputChange}
          placeholder="Ajouter un commentaire"
        />
      </div>
      <div className="commentAdd__box-button">
        <button onClick={addComment}>Add</button>
      </div>
    </div>
  );
}
