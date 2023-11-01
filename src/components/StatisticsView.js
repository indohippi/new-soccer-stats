import React from 'react';

const StatisticsView = ({ players = [], actions = [] }) => {
  // Calculate player statistics
  const getPlayerStats = (playerId) => {
    const playerActions = actions.filter(action => action.playerId === playerId);
    const shotsTaken = playerActions.length;
    const shotsMade = playerActions.filter(action => action.type === 'made').length;
    const shotsMissed = shotsTaken - shotsMade;

    return {
      shotsTaken,
      shotsMade,
      shotsMissed
    };
  };

  // Calculate team statistics
  const teamStats = {
    totalShotsTaken: actions.length,
    totalShotsMade: actions.filter(action => action.type === 'made').length,
    totalShotsMissed: actions.length - actions.filter(action => action.type === 'made').length
  };

  return (
    <div>
      <h2>Player Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Shots Taken</th>
            <th>Shots Made</th>
            <th>Shots Missed</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => {
            const stats = getPlayerStats(player.id);
            return (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{stats.shotsTaken}</td>
                <td>{stats.shotsMade}</td>
                <td>{stats.shotsMissed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Team Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Total Shots Taken</th>
            <th>Total Shots Made</th>
            <th>Total Shots Missed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{teamStats.totalShotsTaken}</td>
            <td>{teamStats.totalShotsMade}</td>
            <td>{teamStats.totalShotsMissed}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsView;
