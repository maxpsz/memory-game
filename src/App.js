import { useState, useEffect } from 'react';

import Card from './components/Card';

import './App.css';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  };

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards =>
        prevCards.map(card => {
          return card.src === choiceOne.src ? { ...card, matched: true } : card;
        })
      );
    }

    setTimeout(() => resetTurn(), 1000);
  }, [choiceOne, choiceTwo]);

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={[choiceOne, choiceTwo].includes(card) || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
