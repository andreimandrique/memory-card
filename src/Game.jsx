import { useState, useEffect } from "react";
import Card from "./Card";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[random]] = [copy[random], copy[i]];
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
      const fetchedData = await response.json();
      setData(shuffle(fetchedData));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleClick(e) {
    // Shuffle the cards
    setData((prevData) => shuffle([...prevData]));

    // Get the image name
    const characterName = e.currentTarget.getAttribute("name");

    // Add the character to the array
    setCharacters((prevCharacters) => [...prevCharacters, characterName]);

    // Check if the character has been clicked before
    const match = (element) => element === characterName;

    if (characters.some(match)) {
      // Lose condition
      setCharacters([]);
      setScore(0);

      if (score > bestScore) {
        setBestScore(score);
      }
    } else if (score === data.length - 1) {
      // Win condition
      setCharacters([]);
      setBestScore(score + 1);
      setScore(0);
    } else {
      // Continue playing
      setScore((prevScore) => prevScore + 1);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data. Please try again later.</div>;

  return (
    <div>
      <div className="score-container">
        <div>Score: {score}</div>
        <div>Best Score: {bestScore}</div>
      </div>
      <div className="card-container">
        {data.map((item) => (
          <div
            className="card"
            name={item.name}
            key={item.id}
            onClick={handleClick}
          >
            <Card title={item.name} imgUrl={item.image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
