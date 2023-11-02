import React, { useState } from 'react';

const PlayerManagement = ({ players, setPlayers }) => {
  const [name, setName] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const addPlayer = () => {
    if (name.trim() === '' || jerseyNumber.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
    const newPlayer = {
      id: Date.now(),
      name,
      jerseyNumber
    };
    setPlayers([...players, newPlayer]);
    setName('');
    setJerseyNumber('');
  };

  const startEditPlayer = (playerId) => {
    const playerToEdit = players.find(player => player.id === playerId);
    setName(playerToEdit.name);
    setJerseyNumber(playerToEdit.jerseyNumber);
    setEditMode(true);
    setCurrentEditId(playerId);
  };

  const saveEditPlayer = () => {
    const updatedPlayers = players.map(player => 
      player.id === currentEditId ? { ...player, name, jerseyNumber } : player
    );
    setPlayers(updatedPlayers);
    setName('');
    setJerseyNumber('');
    setEditMode(false);
    setCurrentEditId(null);
  };

  const deletePlayer = (playerId) => {
    const updatedPlayers = players.filter(player => player.id !== playerId);
    setPlayers(updatedPlayers);
  };

  return (
    <div>
      <h2>Player Management</h2>
      <input type="text" placeholder="Player Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Jersey Number" value={jerseyNumber} onChange={(e) => setJerseyNumber(e.target.value)} />
      {!editMode ? (
        <button onClick={addPlayer}>Add Player</button>
      ) : (
        <button onClick={saveEditPlayer}>Save Changes</button>
      )}
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name} - {player.jerseyNumber}
            <button onClick={() => startEditPlayer(player.id)}>Edit</button>
            <button onClick={() => deletePlayer(player.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerManagement;
