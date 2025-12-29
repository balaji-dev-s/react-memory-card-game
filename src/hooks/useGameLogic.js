import React, { useEffect, useState } from "react";

export const useGameLogic = (cardValues) => {
  // All cards in the game
  const [cards, setCards] = useState([]);

  // Stores the currently flipped cards (max 2)
  const [flippedCards, setFlippedcards] = useState([]);

  // Player score (how many matches)
  const [score, setScore] = useState(0);

  // Number of moves played
  const [moves, setMoves] = useState(0);

  // Lock the game when checking cards
  const [isLocked, setIsLocked] = useState(false);

  // Shuffle cards randomly
  const shuffleArray = (array) => {
    const shuffled = [...array]; // make a copy
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  };

  // Start or reset the game
  const initializeGame = () => {
    const shuffled = shuffleArray(cardValues);

    // Create card objects
    const finalCards = shuffled.map((value, index) => {
      return {
        id: index,
        value: value,
        isFlipped: false,
        isMatched: false,
      };
    });

    // Reset all states
    setCards(finalCards);
    setFlippedcards([]);
    setScore(0);
    setMoves(0);
    setIsLocked(false);
  };

  // Run once when game loads
  useEffect(() => {
    initializeGame();
  }, []);

  // When user clicks a card
  const handlecardClick = (card) => {
    // Stop if card is already open, matched, or game is locked
    if (card.isFlipped || card.isMatched || isLocked) {
      return;
    }

    // Flip the clicked card
    const updatedCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      }
      return c;
    });

    setCards(updatedCards);

    // Save flipped cards
    const newFlippedCards = [...flippedCards, card];
    setFlippedcards(newFlippedCards);

    // If only one card is flipped, wait
    if (newFlippedCards.length !== 2) {
      return;
    }

    // Two cards are flipped now
    setIsLocked(true);
    setMoves((prev) => prev + 1);

    const firstCard = newFlippedCards[0];
    const secondCard = newFlippedCards[1];

    // If both cards match
    if (firstCard.value === secondCard.value) {
      setTimeout(() => {
        const matchedCards = updatedCards.map((c) => {
          if (c.id === firstCard.id || c.id === secondCard.id) {
            return { ...c, isMatched: true };
          }
          return c;
        });

        setCards(matchedCards);
        setFlippedcards([]);
        setIsLocked(false);
      }, 50);

      // Increase score
      setScore((prev) => prev + 1);
    } 
    // If cards do not match
    else {
      setTimeout(() => {
        const flippedBackCards = updatedCards.map((c) => {
          if (c.id === firstCard.id || c.id === secondCard.id) {
            return { ...c, isFlipped: false };
          }
          return c;
        });

        setCards(flippedBackCards);
        setFlippedcards([]);
        setIsLocked(false);
      }, 700);
    }
  };

  // Check if all cards are matched
  const isGameOver = cards.length > 0 && cards.every((c) => c.isMatched);

  // Return values to use in UI
  return {
    cards,
    score,
    moves,
    isGameOver,
    initializeGame,
    handlecardClick,
  };
};
