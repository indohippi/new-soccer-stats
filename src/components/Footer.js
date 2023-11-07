import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        textAlign: 'center',
        p: 2,
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          © 2023 Soccer Stats App, Heavenly Wave
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
