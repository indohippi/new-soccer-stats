import React, { useState } from 'react';

const GameManagement = ({ players, onStartGame, onEndGame }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handlePlayerSelect = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(prevPlayers => prevPlayers.filter(id => id !== playerId));
    } else {
      setSelectedPlayers(prevPlayers => [...prevPlayers, playerId]);
    }
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
    onStartGame(selectedPlayers);
  };

  const handleEndGame = () => {
    setIsGameStarted(false);
    onEndGame();
    setSelectedPlayers([]);
  };

  const gameManagementStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    marginBottom: '20px'
  };

  return (
    <div style={gameManagementStyle}>
      <h2>Game Management</h2>
      <div>
        <h3>Select Players for the Game</h3>
        {players.map(player => (
          <div key={player.id}>
            <input 
              type="checkbox" 
              checked={selectedPlayers.includes(player.id)} 
              onChange={() => handlePlayerSelect(player.id)} 
            />
            {player.name} (Jersey No: {player.jerseyNumber})
          </div>
        ))}
      </div>
      <div>
        {!isGameStarted ? (
          <button onClick={handleStartGame} disabled={selectedPlayers.length === 0}>
            Start Game
          </button>
        ) : (
          <button onClick={handleEndGame}>
            End Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameManagement;
