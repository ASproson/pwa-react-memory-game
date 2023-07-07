import shuffle from "./utils/shuffle";
import Card from "./components/Card";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState(shuffle);

  return (
    <>
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;
          return (
            <Card
              key={id}
              image={image}
              // selected={selected}
              onClick={() => {}}
            />
          );
        })}
      </div>
      ;
    </>
  );
}

export default App;
