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
    setSavedGames(prevGames => [...prevGames, currentGame]);
    setCurrentGame(null);
  };

  const handleActionDrop = (action) => {
    setCurrentGame(prevGame => ({
      ...prevGame,
      actions: [...prevGame.actions, action]
    }));
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
