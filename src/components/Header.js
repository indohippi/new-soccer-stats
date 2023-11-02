import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0'
  };

  return (
    <header style={headerStyle}>
      <h1>Soccer Statistics Tracker</h1>
    </header>
  );
};

export default Header;
