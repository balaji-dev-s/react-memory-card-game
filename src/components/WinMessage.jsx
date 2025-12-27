import React from "react";


export const WinMessage = ({ moves }) => {
  return <div className="win-message">
    <h2>Congradulations</h2>
    <p>You completed the game in {moves} moves!</p>
  </div>
}