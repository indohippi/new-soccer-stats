import React from 'react';

const GameManagement = ({ currentGame, setCurrentGame, players }) => {
  return (
    <div>
      <h2>Game Management</h2>
      {!currentGame ? (
        <button onClick={() => setCurrentGame({ players: [], status: 'ongoing' })}>Start New Game</button>
      ) : (
        <>
          <button onClick={() => setCurrentGame(null)}>End Game</button>
          {/* Add player selection for the game here */}
        </>
      )}
    </div>
  );
};

export default GameManagement;
