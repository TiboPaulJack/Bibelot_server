import './productCard.css'
import {useNavigate} from "react-router-dom";
import Like from "../Like/Like.jsx";

export default function ProductCard(props) {

  const navigate = useNavigate();

  const id = props.id;


  return (
    <div className="productCard" >
      <div className="card__image" onClick={() => navigate(`/model/${id}`)}>
        <img src={ props.url } alt=""/> </div>
      <div className="card__infos">
        <div className="card__infos-title">{ props.name }</div>
        <div className="card__infos-author">{ props.pseudo }</div>
        <Like like={props.like}/>
      </div>
    </div>
  )
}
