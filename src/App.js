import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import PlayerManagement from './components/PlayerManagement';
import GameManagement from './components/GameManagement';
import ActionTracking from './components/ActionTracking';
import StatisticsView from './components/StatisticsView';
import SavedGames from './components/SavedGames';
import Footer from './components/Footer';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [savedGames, setSavedGames] = useState([]);

  const onStartGame = (selectedPlayers) => {
    setCurrentGame({
      id: Date.now(),
      players: selectedPlayers,
      actions: []
    });
  };

  const onEndGame = () => {
    const playerStats = calculatePlayerStats(currentGame);
    const teamStats = calculateTeamStats(currentGame);

    const gameToSave = {
      ...currentGame,
      playerStats,
      teamStats
    };

    setSavedGames(prevGames => [...prevGames, gameToSave]);
    setCurrentGame(null);
  };

  const handleActionDrop = (action) => {
    setCurrentGame(prevGame => ({
      ...prevGame,
      actions: [...prevGame.actions, action]
    }));
  };

  // Placeholder function for calculating player stats
  const calculatePlayerStats = (game) => {
    // Implement the logic to calculate player stats
    // This should return an object or array with the calculated stats
    return {}; // Replace with actual stats calculation
  };

  // Placeholder function for calculating team stats
  const calculateTeamStats = (game) => {
    // Implement the logic to calculate team stats
    // This should return an object with the calculated stats
    return {}; // Replace with actual stats calculation
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <Header />
        <PlayerManagement players={players} setPlayers={setPlayers} />
        <GameManagement 
          currentGame={currentGame} 
          setCurrentGame={setCurrentGame} 
          players={players} 
          onStartGame={onStartGame}
          onEndGame={onEndGame}
        />
        <ActionTracking currentGame={currentGame} players={players} handleActionDrop={handleActionDrop} />
        <StatisticsView players={players} actions={currentGame?.actions || []} />
        <SavedGames games={savedGames} />
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;
