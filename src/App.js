import React, { useState, useEffect } from 'react';
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

  const handleActionDrop = (action) => {
    console.log(`${action.type} action: `, action); // Log every action
    setCurrentGame(prevGame => ({
      ...prevGame,
      actions: [...prevGame.actions, action]
    }));
    // Update player statistics immediately after an action is added
    updatePlayerStats(action.playerId, action.type);
  };

  const updatePlayerStats = (playerId, actionType) => {
    // Find the player in the players array and update their stats
    setPlayers(prevPlayers => prevPlayers.map(player => {
      if (player.id === playerId) {
        // Increment the relevant stat based on the actionType
        const updatedStats = { ...player.stats };
        switch (actionType) {
          case 'shotTaken':
            updatedStats.shotsTaken = (updatedStats.shotsTaken || 0) + 1;
            break;
          case 'shotMade':
            updatedStats.shotsMade = (updatedStats.shotsMade || 0) + 1;
            break;
          case 'passCompleted':
            updatedStats.passesCompleted = (updatedStats.passesCompleted || 0) + 1;
            break;
          // Add more cases for other action types if necessary
        }
        return { ...player, stats: updatedStats };
      }
      return player;
    }));
  };

  const calculateTeamStats = (actions) => {
    // Calculate team stats based on all actions
    const teamStats = {
      shotsTaken: 0,
      shotsMade: 0,
      passesCompleted: 0,
      // Initialize other stats as needed
    };

    actions.forEach(action => {
      switch (action.type) {
        case 'shotTaken':
          teamStats.shotsTaken += 1;
          break;
        case 'shotMade':
          teamStats.shotsMade += 1;
          break;
        case 'passCompleted':
          teamStats.passesCompleted += 1;
          break;
        // Add more cases for other action types if necessary
      }
    });

    return teamStats;
  };

  const onEndGame = () => {
    const newTeamStatistics = calculateTeamStats(currentGame.actions);
    const gameToSave = {
      ...currentGame,
      teamStats: newTeamStatistics
    };

    setSavedGames(prevGames => [...prevGames, gameToSave]);
    setCurrentGame(null);
  };

  // Effect to log state changes (for debugging purposes)
  useEffect(() => {
    console.log('Current game state updated:', currentGame);
  }, [currentGame]);

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
        {/* Add a key prop to force re-render */}
        <StatisticsView key={currentGame?.actions.length || 0} players={players} actions={currentGame?.actions || []} />
        <SavedGames games={savedGames} />
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;
