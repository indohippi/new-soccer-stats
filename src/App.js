import React, { useState } from 'react';
import Header from './components/Header';
import PlayerManagement from './components/PlayerManagement';
import GameManagement from './components/GameManagement';
import ActionTracking from './components/ActionTracking';
import StatisticsView from './components/StatisticsView';
import Footer from './components/Footer';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [actions, setActions] = useState([]);

  const onStartGame = (selectedPlayers) => {
    setCurrentGame({
      players: selectedPlayers,
      actions: []
    });
  };

  const onEndGame = () => {
    setCurrentGame(null);
  };

  return (
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
      <ActionTracking currentGame={currentGame} actions={actions} setActions={setActions} />
      <StatisticsView players={players} actions={actions} />
      <Footer />
    </div>
  );
};

export default App;
