import './productList.css'
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseHost from "../../assets/baseHost.js";

export default function ProductList() {

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
      fetch(BaseHost + '/model')
        .then(response => response.json())
        .then(data => {
          return data.map( item => {
            const pics = new Uint8Array( item.picture.data );
            const blob = new Blob( [pics], { type: 'image/png' } );
            item.picture = URL.createObjectURL( blob );
            return item;
          } );
        })
        .then(data => setCards(data))
        .then(() => setIsLoading(false))
  }, []);


  return (
    <div className="productList">
      {isLoading &&
        (Array.from({ length: 12 }).map((_, index) => ({
          id: index,
          pseudo: "",
          name: "",
          like: "",
          picture: "",
        })).map((card) => (
          <ProductCard
            id={card.id}
            key={card.id}
            pseudo={card.pseudo}
            name={card.name}
            like={card.like}
            tags={card.tags}
            url={card.picture}
            isLoading={isLoading}
          />
        )))
      }
      {!isLoading &&
        cards.map((card) => (
          <ProductCard
            id={card.id}
            key={card.id}
            pseudo={card.pseudo}
            name={card.name}
            tags={card.tags}
            like={card.like}
            url={card.picture}
            isLoading={isLoading}
          />
        ))
      }
    </div>
  );

}
