import React from 'react';

const SavedGames = ({ games }) => {
  return (
    <div>
      <h2>Saved Games</h2>
      {games.map((game, gameIndex) => (
        <div key={game.id || gameIndex}>
          <h3>Game ID: {game.id}</h3>
          <h4>Players:</h4>
          <ul>
            {game.players.map((player, playerIndex) => (
              <li key={player.id || playerIndex}>{player.name}</li>
            ))}
          </ul>
          <h4>Actions:</h4>
          <ul>
            {game.actions.map((action, actionIndex) => (
              <li key={`${action.playerId}-${action.type}-${actionIndex}`}>
                Player {action.playerId} {action.type} from {action.location}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SavedGames;
