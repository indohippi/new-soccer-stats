import React, { useState } from 'react';

const PlayerStatsForm = ({ players, onAddAction }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [actionType, setActionType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlayer && actionType && location) {
      onAddAction({
        playerId: selectedPlayer,
        type: actionType,
        location: location
      });
      // Reset the form fields after submission
      setSelectedPlayer('');
      setActionType('');
      setLocation('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Player:</label>
        <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>
          <option value="">--Select Player--</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Action Type:</label>
        <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
            <option value="">--Select Action--</option>
            <option value="Goal">Goal</option>
            <option value="On Target Miss">On Target Miss</option>
            <option value="Off Target Miss">Off Target Miss</option>
            <option value="Assist">Assist</option>
            {/* Add more options as needed for Level 2 */}
        </select>
      </div>

      <div>
        <label>Location on Field:</label>
        <input
          type="text"
          placeholder="e.g. Top Left Corner"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button type="submit">Add Action</button>
    </form>
  );
};

export default PlayerStatsForm;
