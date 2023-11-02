import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    position: 'fixed',
    bottom: '0',
    width: '100%'
  };

  return (
    <footer style={footerStyle}>
      <p>© 2023 Soccer Stats App</p>
    </footer>
  );
};

export default Footer;
