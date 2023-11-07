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
    setCurrentGame(prevGame => ({
      ...prevGame,
      actions: [...prevGame.actions, action]
    }));
  };

  const getPlayerStats = (playerId, actions) => {
    const playerActions = actions.filter(action => action.playerId === playerId);
    const goals = playerActions.filter(action => action.type === 'Goal').length;
    const assists = playerActions.filter(action => action.type === 'Assist').length;
    // Add more stats as needed
    return {
      goals,
      assists,
      // Add more stats as needed
    };
  };

  const calculateTeamStats = (actions) => {
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
    const newPlayerStatistics = players.map(player => ({
      id: player.id,
      name: player.name,
      stats: getPlayerStats(player.id, currentGame.actions)
    }));
    const newTeamStatistics = calculateTeamStats(currentGame.actions);

    const gameToSave = {
      ...currentGame,
      playerStats: newPlayerStatistics,
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
