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
  const [choiceDisabled, setChoiceDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
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
    setChoiceDisabled(false);
  };

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    if (choiceOne && choiceTwo) setChoiceDisabled(true);

    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards =>
        prevCards.map(card => {
          return card.src === choiceOne.src ? { ...card, matched: true } : card;
        })
      );
    }

    setTimeout(() => resetTurn(), 1000);
  }, [choiceOne, choiceTwo]);

  useEffect(() => shuffleCards(), []);

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={[choiceOne, choiceTwo].includes(card) || card.matched}
            disabled={choiceDisabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
