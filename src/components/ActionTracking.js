import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = {
  PLAYER: 'player'
};

const PlayerThumbnail = ({ player, handleDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.PLAYER,
    item: { id: player.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {player.jerseyNumber}
    </div>
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
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
      {type}
    </div>
  );
};

const ActionTracking = ({ players = [], currentGame, actions, setActions }) => {
    const [location, setLocation] = useState('');
  
    const handleDrop = (type, playerId) => {
      const newAction = {
        playerId: playerId,
        type: type,
        location: location
      };
      // Accumulate actions
      setActions(prevActions => [...prevActions, newAction]);
      setLocation('');
    };

  const actionTrackingStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    marginBottom: '20px'
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={actionTrackingStyle}>
        <h2>Action Tracking</h2>
        <div>
          {players.map((player) => (
            <PlayerThumbnail key={player.id} player={player} />
          ))}
        </div>
        <div>
          <ActionArea type="Goal" onDrop={handleDrop} />
          <ActionArea type="On Target Miss" onDrop={handleDrop} />
          <ActionArea type="Off Target Miss" onDrop={handleDrop} />
          <ActionArea type="Assist" onDrop={handleDrop} />
        </div>
        <div>
          <label>Location: </label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location on the field" />
        </div>
      </div>
    </DndProvider>
  );
};

export default ActionTracking;
