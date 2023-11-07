import React, { useState } from 'react';

const SavedGames = ({ games }) => {
  const [expandedGameId, setExpandedGameId] = useState(null);

  const toggleGameDetails = (gameId) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  // Ensure that games is always an array
  const safeGames = games || [];

  return (
    <div>
      <h2>Saved Games</h2>
      {safeGames.map((game) => (
        <div key={game.id}>
          <h3>Game ID: {game.id}</h3>
          <button onClick={() => toggleGameDetails(game.id)}>
            {expandedGameId === game.id ? 'Hide Details' : 'Show Details'}
          </button>
          {expandedGameId === game.id && (
            <div>
              <h4>Player Stats:</h4>
              <ul>
                {game.playerStats.map((stat) => (
                  <li key={stat.id}>
                    {stat.name}: Goals: {stat.stats.goals}, Assists: {stat.stats.assists}
                    {/* Display other stats as needed */}
                  </li>
                ))}
              </ul>
              <h4>Team Stats:</h4>
              <div>
                Total Goals: {game.teamStats.goals}
                Total Assists: {game.teamStats.assists}
                {/* Display other team stats as needed */}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SavedGames;
