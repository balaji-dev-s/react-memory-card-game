import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { WinMessage } from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";

const cardValues = ["🐯", "🐼", "🐻‍❄️", "🦊", "🐭", "🐷", "🐮", "🐻", "🐯", "🐼", "🐻‍❄️", "🦊", "🐭", "🐷", "🐮", "🐻"];
function App() {
  const { cards, score, moves, isGameOver, initializeGame, handlecardClick } = useGameLogic(cardValues);

  return (
    <>
      <div className="app">
        <Header score={score} moves={moves} onReset={initializeGame} />

        {isGameOver && <WinMessage moves={moves} />}

        <div className="cards-grid">
          {cards.map((card) => (
            <Card card={card} onClick={handlecardClick} />
          ))}

        </div>
      </div>
      <div className="footer">
        2025 Balaji S |
        Learning project inspired by existing work, implemented independently.
      </div>
    </>
  )
};

export default App
