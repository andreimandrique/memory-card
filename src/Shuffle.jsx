import { useState } from "react";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [array[i], array[random]] = [array[random], array[i]];
  }
}

const initialList = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

function Shuffle() {
  const [card, setCard] = useState(initialList);

  function handleClick() {
    setCard((c) => [...c, shuffle(card)]);
  }

  return (
    <>
      <h1>{card}</h1>
      <button onClick={handleClick}>Click</button>{" "}
    </>
  );
}

export default Shuffle;
