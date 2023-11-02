import React, { useState } from 'react';

const ActionTracking = ({ players = [], currentGame, actions, setActions }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [actionType, setActionType] = useState('');
  const [location, setLocation] = useState('');

  const handleActionSubmit = (e) => {
    e.preventDefault();
    if (selectedPlayer && actionType && location) {
      const newAction = {
        playerId: selectedPlayer,
        type: actionType,
        location: location
      };
      setActions([...actions, newAction]);
    }
    setActionType('');
    setLocation('');
  };

  const actionTrackingStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    marginBottom: '20px'
  };

  return (
    <div style={actionTrackingStyle}>
      <h2>Action Tracking</h2>
      <form onSubmit={handleActionSubmit}>
        <div>
          <label>Select Player: </label>
          <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>
            <option value="">--Select--</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>
                {player.name} - {player.jerseyNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Action Type: </label>
          <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
            <option value="">--Select--</option>
            <option value="made">Shot Made</option>
            <option value="missed">Shot Missed</option>
          </select>
        </div>
        <div>
          <label>Location: </label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location on the field" />
        </div>
        <div>
          <button type="submit">Add Action</button>
        </div>
      </form>
    </div>
  );
};

export default ActionTracking;
