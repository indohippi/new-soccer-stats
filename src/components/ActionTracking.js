import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid, Paper, Typography, Box } from '@mui/material';

const ItemType = {
  PLAYER: 'player',
  ACTION: 'action',
};

const PlayerThumbnail = ({ player, selectPlayer, isSelected }) => {
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
      onClick={() => selectPlayer(player.id)}
      sx={{
        padding: 1,
        textAlign: 'center',
        backgroundColor: isSelected ? 'lightblue' : 'white',
        cursor: 'pointer',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {player.jerseyNumber}
    </Paper>
  );
};

const ActionButton = ({ actionType, handleSelectAction }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.ACTION,
    item: { type: actionType },
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
        backgroundColor: 'white',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => handleSelectAction(actionType)}
    >
      {actionType}
    </Paper>
  );
};

const FieldGrid = ({ onDropAction }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.ACTION,
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        onDropAction(item.type, offset.x, offset.y);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Create a 5x5 grid to represent the soccer field
  const rows = 5;
  const cols = 5;
  const fieldGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 'field-cell')
  );

  return (
    <Box ref={drop} sx={{ position: 'relative', width: '100%', height: 300, backgroundColor: isOver ? 'lightgreen' : 'green' }}>
      {fieldGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Box
            key={`${rowIndex}-${colIndex}`}
            sx={{
              position: 'absolute',
              width: '20%',
              height: '20%',
              top: `${rowIndex * 20}%`,
              left: `${colIndex * 20}%`,
              border: '1px solid white',
            }}
          />
        ))
      )}
    </Box>
  );
};

const ActionTracking = ({ players = [], handleActionDrop }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const selectPlayer = (playerId) => {
    setSelectedPlayerId(playerId);
  };

  const handleSelectAction = (actionType) => {
    setSelectedAction(actionType);
  };

  const handleDropAction = (actionType, x, y) => {
    if (selectedPlayerId) {
      const newAction = {
        playerId: selectedPlayerId,
        type: actionType,
        location: { x, y },
      };

      // Call the handleActionDrop function passed from the parent component
      // with the new action
      handleActionDrop(newAction);

      // Reset the selected player and action
      setSelectedPlayerId(null);
      setSelectedAction(null);
    }
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
              <PlayerThumbnail
                player={player}
                selectPlayer={selectPlayer}
                isSelected={selectedPlayerId === player.id}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          {['Goal', 'On Target Miss', 'Off Target Miss', 'Assist'].map((actionType) => (
            <Grid item key={actionType} xs={3}>
              <ActionButton actionType={actionType} handleSelectAction={handleSelectAction} />
            </Grid>
          ))}
        </Grid>
        <FieldGrid onDropAction={handleDropAction} />
      </Box>
    </DndProvider>
  );
};

export default ActionTracking;
