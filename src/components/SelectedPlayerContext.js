import React, { createContext, useState, useContext } from 'react';

const SelectedPlayerContext = createContext({
  selectedPlayerId: null,
  selectPlayer: () => {}
});

export const useSelectedPlayer = () => useContext(SelectedPlayerContext);

export const SelectedPlayerProvider = ({ children }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(localStorage.getItem('selectedPlayerId') || null);

  const selectPlayer = (playerId) => {
    setSelectedPlayerId(playerId);
    localStorage.setItem('selectedPlayerId', playerId);
  };

  return (
    <SelectedPlayerContext.Provider value={{ selectedPlayerId, selectPlayer }}>
      {children}
    </SelectedPlayerContext.Provider>
  );
};

export default SelectedPlayerContext;
