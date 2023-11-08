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
        if (actionType === 'Goal') {
          updatedStats.goals = (updatedStats.goals || 0) + 1;
        } else if (actionType === 'Assist') {
          updatedStats.assists = (updatedStats.assists || 0) + 1;
        } else if (actionType === 'On Target Miss') {
          updatedStats.onTargetMisses = (updatedStats.onTargetMisses || 0) + 1;
        } else if (actionType === 'Off Target Miss') {
          updatedStats.offTargetMisses = (updatedStats.offTargetMisses || 0) + 1;
        }
        // Add more conditions for other action types if necessary
        return { ...player, stats: updatedStats };
      }
      return player;
    }));
  };

  const calculateTeamStats = (actions) => {
    // Calculate team stats based on all actions
    const goals = actions.filter(action => action.type === 'Goal').length;
    const assists = actions.filter(action => action.type === 'Assist').length;
    // Add more team stats as needed
    return {
      goals,
      assists,
      // Add more team stats as needed
    };
  };

  const onEndGame = () => {
    const newTeamStatistics = calculateTeamStats(currentGame.actions) || { goals: 0, assists: 0 };

    const gameToSave = {
      ...currentGame,
      teamStats: newTeamStatistics
    };

    setSavedGames(prevGames => [...prevGames, gameToSave]);
    setCurrentGame(null);
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
