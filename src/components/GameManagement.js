import React, { useState } from 'react';

const GameManagement = ({ players }) => {
  const [activeGame, setActiveGame] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const startNewGame = () => {
    setActiveGame(true);
  };

  const endGame = () => {
    setActiveGame(false);
    setSelectedPlayers([]);
  };

  const togglePlayerSelection = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(prevPlayers => prevPlayers.filter(id => id !== playerId));
    } else {
      setSelectedPlayers(prevPlayers => [...prevPlayers, playerId]);
    }
  };

  return (
    <div>
      <h2>Game Management</h2>
      {!activeGame ? (
        <button onClick={startNewGame}>Start New Game</button>
      ) : (
        <>
          <button onClick={endGame}>End Game</button>
          <h3>Select Players for the Game</h3>
          <ul>
            {players.map(player => (
              <li key={player.id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedPlayers.includes(player.id)} 
                    onChange={() => togglePlayerSelection(player.id)}
                  />
                  {player.name} - {player.jerseyNumber}
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GameManagement;
