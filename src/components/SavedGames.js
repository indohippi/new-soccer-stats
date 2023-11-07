import React, { useState } from 'react';
import jsPDF from 'jspdf';

const SavedGames = ({ games }) => {
  const [expandedGameId, setExpandedGameId] = useState(null);

  const toggleGameDetails = (gameId) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  const exportToPDF = (game) => {
    const doc = new jsPDF();

    doc.text(`Game ID: ${game.id}`, 10, 10);
    doc.text('Player Stats:', 10, 20);
    game.playerStats.forEach((stat, index) => {
      doc.text(`${stat.name}: Goals: ${stat.stats.goals}, Assists: ${stat.stats.assists}`, 10, 30 + (index * 10));
    });
    doc.text(`Team Stats:`, 10, 30 + (game.playerStats.length * 10));
    doc.text(`Total Goals: ${game.teamStats.goals}`, 10, 40 + (game.playerStats.length * 10));
    doc.text(`Total Assists: ${game.teamStats.assists}`, 10, 50 + (game.playerStats.length * 10));

    doc.save(`game_${game.id}.pdf`);
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
          <button onClick={() => exportToPDF(game)}>Export to PDF</button>
        </div>
      ))}
    </div>
  );
};

export default SavedGames;
