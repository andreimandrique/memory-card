import { useState, useEffect } from "react";
import Card from "./Card";

function shuffle(array) {
  const copy = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }

  return copy;
}

function Game() {
  const [data, setData] = useState([]);

  const API = "https://rickandmortyapi.com/api/character/[1,2,3]";

  async function getData() {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleClick() {
    setData((prevData) => shuffle(prevData));
  }

  const cardList = data.map((item) => (
    <div key={item.id}>
      <Card title={item.name} imgUrl={item.image}></Card>
    </div>
  ));

  return (
    <>
      <button onClick={handleClick}>Random</button>
      <div>{cardList}</div>
    </>
  );
}

export default Game;
