import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const StatisticsView = ({ players = [], actions = [] }) => {
  // Debugging: Log when actions or players change
  useEffect(() => {
    console.log('Actions or players have changed:', { actions, players });
  }, [actions, players]);

  // Calculate team statistics
  const teamStats = {
    totalShotsTaken: actions.filter(action => action.type !== 'Assist').length,
    totalShotsMade: actions.filter(action => action.type === 'Goal').length,
    totalShotsMissed: actions.filter(action => action.type.includes('Miss')).length,
    totalAssists: actions.filter(action => action.type === 'Assist').length
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Player Statistics
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell align="right">Shots Taken</TableCell>
              <TableCell align="right">Shots Made</TableCell>
              <TableCell align="right">Shots Missed</TableCell>
              <TableCell align="right">Assists</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => {
              const stats = player.stats || { shotsTaken: 0, shotsMade: 0, shotsMissed: 0, assists: 0 };
              return (
                <TableRow
                  key={player.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {player.name}
                  </TableCell>
                  <TableCell align="right">{stats.shotsTaken}</TableCell>
                  <TableCell align="right">{stats.shotsMade}</TableCell>
                  <TableCell align="right">{stats.shotsMissed}</TableCell>
                  <TableCell align="right">{stats.assists}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Team Statistics
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Total Shots Taken</TableCell>
              <TableCell align="right">Total Shots Made</TableCell>
              <TableCell align="right">Total Shots Missed</TableCell>
              <TableCell align="right">Total Assists</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {teamStats.totalShotsTaken}
              </TableCell>
              <TableCell align="right">{teamStats.totalShotsMade}</TableCell>
              <TableCell align="right">{teamStats.totalShotsMissed}</TableCell>
              <TableCell align="right">{teamStats.totalAssists}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StatisticsView;
