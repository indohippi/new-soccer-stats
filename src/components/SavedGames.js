import React, { useState } from 'react';

const SavedGames = ({ games }) => {
  const [expandedGameId, setExpandedGameId] = useState(null);

  const toggleGameDetails = (gameId) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  return (
    <div>
      <h2>Saved Games</h2>
      {games.map((game) => (
        <div key={game.id}>
          <h3>Game ID: {game.id}</h3>
          <button onClick={() => toggleGameDetails(game.id)}>
            {expandedGameId === game.id ? 'Hide Details' : 'Show Details'}
          </button>
          {expandedGameId === game.id && (
            <div>
              <h4>Player Stats:</h4>
              {/* Render player stats here */}
              <h4>Team Stats:</h4>
              {/* Render team stats here */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SavedGames;
