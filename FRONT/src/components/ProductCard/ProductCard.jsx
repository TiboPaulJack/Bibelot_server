import "./productCard.css";
import "./productCardLoading.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const {isLoading, setIsLoading} = props;

  const id = props.id;
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [props.url]);
  

  return (
    <div className={isLoading ? "productCard isLoading" : "productCard"}>
      <div
        className={isLoading ? "card__image isLoading" : "card__image"}
        onClick={() => navigate(`/model/${id}`)}
      >
        <img
          className={
            isLoading
              ? "card__image-img isLoading"
              : "card__image-img"
          }
          src={props.url}
          alt=""
        />
      </div>
      <div className="card__infos">
        <div className="card__infos-left">
          <div
            className={
              isLoading ? "card__infos-title isLoading" : "card__infos-title"
            }
          >
            {props.name}
          </div>
          <div
            className={
              isLoading ? "card__infos-author isLoading" : "card__¨infos-author"
            }
          >
            {props.tags}
          </div>
        </div>
        <div className="card__infos-right"></div>
      </div>
    </div>
  );
}
