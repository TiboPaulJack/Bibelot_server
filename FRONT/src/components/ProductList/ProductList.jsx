import './productList.css'
import ProductCard from "../ProductCard/ProductCard.jsx";
import {useEffect, useState} from "react";
import baseApi from "../../assets/baseApi.js";
import {Navigate, useNavigate} from "react-router-dom";
import BaseHost from "../../assets/baseHost.js";

export default function ProductList() {

  const Navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    //todo : change async await for then
    const fetchCards = async () => {
      await fetch(BaseHost + '/model')
        .then(response => response.json())
        .then(data => {
          const newData = data.map(item => {
            const pics = new Uint8Array(item.picture.data);
            const blob = new Blob([pics], { type: 'image/png' });
            item.picture = URL.createObjectURL(blob);
            return item;
          });
          return newData;
        })
        .then(data => setCards(data));
    }
    fetchCards();
  }, []);

  return (
    <div className="productList">
      {cards.map((card) => (
        <ProductCard
          id={card.id}
          key={card.id}
          pseudo={card.pseudo}
          name={card.name}
          like={card.like}
          url={card.picture}
        />
      ))}
    </div>
  );
}
