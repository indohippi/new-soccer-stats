import React, { useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useSelectedPlayer } from './SelectedPlayerContext';

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

  // Ensure the click event stops propagation to prevent unwanted behavior
  const handleSelect = (e) => {
    e.stopPropagation();
    selectPlayer(player.id);
  };

  return (
    <Paper
      ref={drag}
      onClick={handleSelect}
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
  const { selectedPlayerId, selectPlayer } = useSelectedPlayer(); // Use the context hook

  const handleSelectAction = (actionType) => {
    // Action selection logic (if any) goes here
    // This function is currently not used, you might want to implement it or remove it if unnecessary
  };

  const handleDropAction = (actionType, x, y) => {
    console.log(`Handling drop action for player ID: ${selectedPlayerId}`);
    if (selectedPlayerId) {
      const newAction = {
        playerId: selectedPlayerId,
        type: actionType,
        location: { x, y },
      };
      handleActionDrop(newAction);
    } else {
      console.error('No player selected');
    }
  };

  useEffect(() => {
    // This will log every time selectedPlayerId changes
    console.log(`Selected Player ID: ${selectedPlayerId}`);
  }, [selectedPlayerId]);

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
                isSelected={player.id === selectedPlayerId}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {/* Define your action types here */}
          <Grid item xs={2}>
            <ActionButton actionType="Goal" handleSelectAction={handleSelectAction} />
          </Grid>
          <Grid item xs={2}>
            <ActionButton actionType="On Target Miss" handleSelectAction={handleSelectAction} />
          </Grid>
          <Grid item xs={2}>
            <ActionButton actionType="Off Target Miss" handleSelectAction={handleSelectAction} />
          </Grid>
          <Grid item xs={2}>
            <ActionButton actionType="Assist" handleSelectAction={handleSelectAction} />
          </Grid>
          {/* ... other action buttons */}
        </Grid>
        <FieldGrid onDropAction={handleDropAction} />
      </Box>
    </DndProvider>
  );
};

export default ActionTracking;
