import React, { useState } from 'react';
import Header from './components/Header';
import PlayerStatsForm from './components/PlayerStatsForm';
import StatsTable from './components/StatsTable';
import Footer from './components/Footer';

const App = () => {
  const [stats, setStats] = useState([]);

  const addStats = (newStat) => {
    setStats([...stats, newStat]);
  };

  return (
    <div className="app-container">
      <Header />
      <PlayerStatsForm addStats={addStats} />
      <StatsTable stats={stats} />
      <Footer />
    </div>
  );
};

export default App;
