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
    console.log('handleActionDrop called with:', action); // Log every action
    setCurrentGame(prevGame => ({
      ...prevGame,
      actions: [...prevGame.actions, action]
    }));
    // Update player statistics immediately after an action is added
    updatePlayerStats(action.playerId, action.type);
  };

  const updatePlayerStats = (playerId, actionType) => {
    setPlayers(prevPlayers => prevPlayers.map(player => {
      if (player.id === playerId) {
        const updatedStats = { ...player.stats };
        
        // Increment "Shots Taken" for any shot-related action
        if (['Goal', 'On Target Miss', 'Off Target Miss'].includes(actionType)) {
          updatedStats.shotsTaken = (updatedStats.shotsTaken || 0) + 1;
        }
        
        // Increment "Shots Made" for goals
        if (actionType === 'Goal') {
          updatedStats.shotsMade = (updatedStats.shotsMade || 0) + 1;
        }
        
        // Increment "Shots Missed" for misses
        if (['On Target Miss', 'Off Target Miss'].includes(actionType)) {
          updatedStats.shotsMissed = (updatedStats.shotsMissed || 0) + 1;
        }
        
        // Increment "Assists" for assists
        if (actionType === 'Assist') {
          updatedStats.assists = (updatedStats.assists || 0) + 1;
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
      shotsMissed: 0,
      assists: 0,
      // Initialize other stats as needed
    };
  
    actions.forEach(action => {
      switch (action.type) {
        case 'Goal':
          teamStats.shotsTaken += 1;
          teamStats.shotsMade += 1;
          break;
        case 'On Target Miss':
        case 'Off Target Miss':
          teamStats.shotsTaken += 1;
          teamStats.shotsMissed += 1;
          break;
        case 'Assist':
          teamStats.assists += 1;
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
