import { useState, useEffect } from "react";
import Card from "./Card";

function Game() {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/[1,2,3]"
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const cardList = data.map((item) => (
    <div key={item.id}>
      <Card title={item.name} imgUrl={item.image}></Card>
    </div>
  ));

  return <div>{cardList}</div>;
}

export default Game;
