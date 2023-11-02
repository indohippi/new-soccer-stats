import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Corrected import
import Header from './components/Header';
import PlayerManagement from './components/PlayerManagement';
import GameManagement from './components/GameManagement';
import ActionTracking from './components/ActionTracking';
import StatisticsView from './components/StatisticsView';
import SavedGames from './components/SavedGames'; // New import for saved games
import Footer from './components/Footer';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [actions, setActions] = useState([]);
  const [savedGames, setSavedGames] = useState([]); // New state for saved games

  const onStartGame = (selectedPlayers) => {
    setCurrentGame({
      players: selectedPlayers,
      actions: []
    });
  };

  const onEndGame = () => {
    // Save the current game to the saved games list
    setSavedGames(prevGames => [...prevGames, currentGame]);
    setCurrentGame(null);
  };

  return (
    <DndProvider backend={HTML5Backend}> {/* Wrap the entire app with DndProvider */}
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
        <ActionTracking currentGame={currentGame} players={players} actions={actions} setActions={setActions} />
        <StatisticsView players={players} actions={actions} />
        <SavedGames games={savedGames} /> {/* New component for displaying saved games */}
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;
