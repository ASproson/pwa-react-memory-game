import shuffle from "./utils/shuffle";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import useAppBadge from "./hooks/useAppBadge";

function App() {
  const [wins, setWins] = useState(0);
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {
    let pickTimer;

    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 600);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, wins]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);

    if (cards.length && checkWin.length < 1) {
      alert("You win!");
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
      setBadge();
    }
  }, [cards, wins, setBadge]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { image, matched } = card;

          return (
            <Card
              key={image.id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
