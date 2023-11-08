import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Button, List, ListItem, ListItemText, Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SavedGames = ({ games }) => {
  const [expandedGameId, setExpandedGameId] = useState(null);

  const toggleGameDetails = (gameId) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  const exportToPDF = (game) => {
    const doc = new jsPDF();

    doc.text(`Game ID: ${game.id}`, 10, 10);
    doc.text('Player Stats:', 10, 20);
    game.players.forEach((player, index) => {
      // Ensure that each player has a stats object with all necessary properties
      const { goals = 0, assists = 0 } = player.stats || {};
      doc.text(`${player.name}: Goals: ${goals}, Assists: ${assists}`, 10, 30 + (index * 10));
    });
    doc.text(`Team Stats:`, 10, 30 + (game.players.length * 10));
    doc.text(`Total Goals: ${game.teamStats.goals}`, 10, 40 + (game.players.length * 10));
    doc.text(`Total Assists: ${game.teamStats.assists}`, 10, 50 + (game.players.length * 10));

    doc.save(`game_${game.id}.pdf`);
  };

  // Ensure that games is always an array and each game has players and teamStats
  const safeGames = Array.isArray(games) ? games.filter(game => game.players && game.teamStats) : [];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Saved Games
      </Typography>
      {safeGames.length > 0 ? (
        safeGames.map((game) => (
          <Accordion key={game.id} expanded={expandedGameId === game.id} onChange={() => toggleGameDetails(game.id)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Game ID: {game.id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">Player Stats:</Typography>
              <List>
                {game.players.map((player) => {
                  // Ensure that each player has a stats object with all necessary properties
                  const { goals = 0, assists = 0 } = player.stats || {};
                  return (
                    <ListItem key={player.id}>
                      <ListItemText primary={`${player.name}: Goals: ${goals}, Assists: ${assists}`} />
                    </ListItem>
                  );
                })}
              </List>
              <Typography variant="h6">Team Stats:</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Total Goals: ${game.teamStats.goals}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Total Assists: ${game.teamStats.assists}`} />
                </ListItem>
              </List>
            </AccordionDetails>
            <Button variant="contained" onClick={() => exportToPDF(game)} sx={{ m: 2 }}>
              Export to PDF
            </Button>
          </Accordion>
        ))
      ) : (
        <Typography variant="subtitle1">No saved games available.</Typography>
      )}
    </Paper>
  );
};

export default SavedGames;
