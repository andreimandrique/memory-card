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
  const [characters, setCharacters] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const arrayAPI = "[1,2,3,4,5,6,7,8,9,10,11,12]";

  const API = `https://rickandmortyapi.com/api/character/${arrayAPI}`;

  async function getData() {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleClick(e) {
    //shuffle the image
    setData((prevData) => shuffle(prevData));
    //get the image name
    const characterName = e.currentTarget.getAttribute("name");
    //add the character to a array
    setCharacters([...characters, characterName]);
    //return true if the array have the character name
    const match = (element) => element == characterName;

    if (characters.some(match)) {
      // console.log("lose");
      setCharacters([]);
      setScore(0);

      if (score > bestScore) {
        setBestScore(score);
      }
    } else if (score == data.length - 1) {
      // console.log("win");
      setCharacters([]);
      setBestScore(score + 1);
      setScore(0);
    } else {
      setScore(score + 1);
    }
  }

  const cardList = data.map((item) => (
    <div className="card" name={item.name} key={item.id} onClick={handleClick}>
      <Card title={item.name} imgUrl={item.image}></Card>
    </div>
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="score-container">
        <div>Score: {score}</div>
        <div>Best Score: {bestScore}</div>
      </div>
      <div className="card-container">{cardList}</div>
    </div>
  );
}

export default Game;
