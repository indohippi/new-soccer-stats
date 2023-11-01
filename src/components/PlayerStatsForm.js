import React, { useState } from 'react';

const PlayerStatsForm = ({ addStats }) => {
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [shotType, setShotType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addStats({ jerseyNumber, shotType });
    setJerseyNumber('');
    setShotType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Jersey Number" 
        value={jerseyNumber} 
        onChange={(e) => setJerseyNumber(e.target.value)} 
      />
      <select value={shotType} onChange={(e) => setShotType(e.target.value)}>
        <option value="onTarget">On Target</option>
        <option value="offTarget">Off Target</option>
        <option value="goal">Goal</option>
      </select>
      <button type="submit">Add Stats</button>
    </form>
  );
};

export default PlayerStatsForm;
