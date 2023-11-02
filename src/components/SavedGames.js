import React from 'react';

const SavedGames = ({ games }) => {
  return (
    <div>
      <h2>Saved Games</h2>
      {games.map(game => (
        <div key={game.id}>
          <h3>Game ID: {game.id}</h3>
          <h4>Players:</h4>
          <ul>
            {game.players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
          <h4>Actions:</h4>
          <ul>
            {game.actions.map((action, index) => (
              <li key={index}>
                Player {action.playerId} {action.type} from {action.position}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SavedGames;
