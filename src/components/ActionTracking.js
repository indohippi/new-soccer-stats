import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid, Paper, Typography, Box } from '@mui/material';

const ItemType = {
  PLAYER: 'player',
};

const PlayerThumbnail = ({ player }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.PLAYER,
    item: { id: player.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      sx={{
        padding: 1,
        textAlign: 'center',
        backgroundColor: isDragging ? 'lightgrey' : 'white',
        cursor: 'move',
      }}
    >
      {player.jerseyNumber}
    </Paper>
  );
};

const ActionArea = ({ type, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.PLAYER,
    drop: (item) => onDrop(type, item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Paper
      ref={drop}
      sx={{
        padding: 1,
        textAlign: 'center',
        backgroundColor: isOver ? 'lightgray' : 'white',
      }}
    >
      {type}
    </Paper>
  );
};

const ActionTracking = ({ players = [], handleActionDrop }) => {
  const [location, setLocation] = useState('');

  const handleDrop = (type, playerId) => {
    const newAction = {
      playerId: playerId,
      type: type,
      location: location,
    };
    handleActionDrop(newAction);
    setLocation('');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Action Tracking
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {players.map((player) => (
            <Grid item key={player.id} xs={2}>
              <PlayerThumbnail player={player} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          {/* Define action types and map over them for rendering */}
          {['Goal', 'On Target Miss', 'Off Target Miss', 'Assist'].map((actionType) => (
            <Grid item key={actionType} xs={3}>
              <ActionArea type={actionType} onDrop={handleDrop} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Location:</Typography>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location on the field"
            sx={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
        </Box>
      </Box>
    </DndProvider>
  );
};

export default ActionTracking;
