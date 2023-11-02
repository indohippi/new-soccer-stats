import React, { useState } from 'react';

const ActionTracking = ({ players = [] }) => { // Default value for players prop
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [actionType, setActionType] = useState('');
  const [location, setLocation] = useState('');

  const handleActionSubmit = (e) => {
    e.preventDefault();
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
            {Array.isArray(players) && players.map(player => ( // Check if players is an array
              <option key={player.id} value={player.id}>
                {player.name} - {player.jerseyNumber}
              </option>
            ))}
          </select>
        </div>
        {/* ... rest of the component ... */}
      </form>
    </div>
  );
};

export default ActionTracking;
