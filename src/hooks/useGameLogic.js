import React, { useEffect, useState } from "react";


export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedcards] = useState([]);
  const [matchedCards, setMatchedcards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    } return shuffled;
  };

  const initializeGame = () => {
    //Shuffle the cards
    const shuffled = shuffleArray(cardValues);
    const finalCards = shuffled.map((value, index) => (
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }
    ))
    setCards(finalCards);
    setIsLocked(false);
    setScore(0);
    setMoves(0);
    setMatchedcards([]);
    setFlippedcards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handlecardClick = (card) => {
    //Don't allow clicking if the card is already flipped or matched
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) {
      return;
    }
    //update flipped cards state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      }
      else {
        return c;
      }
    })
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id]
    setFlippedcards(newFlippedCards)
    //check if two flipped cards are matched
    if (flippedCards.length == 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedcards((prev) => [...prev, firstCard.id, card.id]);

          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }))
          setFlippedcards([]);
          setIsLocked(false);
        }, 50);
        setScore((prev) => (prev + 1))
      }

      else {
        //flip back the fisrt card and the second card selected
        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            }
            else { return c; }
          });
          setCards(flippedBackCards);
          setIsLocked(false);
          setFlippedcards([]);

        }, 700);
      }
      setMoves((prev) => (prev + 1))
    }
  };

  const isGameOver = matchedCards.length === cardValues.length;

  return{
    cards, score, moves, isGameOver, initializeGame, handlecardClick
  }

};