// GameManagement.js
import React, { useState } from 'react';
import { Box, Checkbox, Button, FormGroup, FormControlLabel, Typography } from '@mui/material';

const GameManagement = ({ players, onStartGame, onEndGame }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handlePlayerSelect = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers((prevPlayers) => prevPlayers.filter((id) => id !== playerId));
    } else {
      setSelectedPlayers((prevPlayers) => [...prevPlayers, playerId]);
    }
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
    onStartGame(selectedPlayers);
  };

  const handleEndGame = () => {
    setIsGameStarted(false);
    onEndGame();
    setSelectedPlayers([]);
  };

  return (
    <Box sx={{ padding: '20px', border: 1, borderColor: 'divider', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Game Management
      </Typography>
      <FormGroup>
        <Typography variant="h6" gutterBottom>
          Select Players for the Game
        </Typography>
        {players.map((player) => (
          <FormControlLabel
            key={player.id}
            control={
              <Checkbox
                checked={selectedPlayers.includes(player.id)}
                onChange={() => handlePlayerSelect(player.id)}
              />
            }
            label={`${player.name} (Jersey No: ${player.jerseyNumber})`}
          />
        ))}
      </FormGroup>
      <Box>
        {!isGameStarted ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartGame}
            disabled={selectedPlayers.length === 0}
          >
            Start Game
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleEndGame}>
            End Game
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GameManagement;
