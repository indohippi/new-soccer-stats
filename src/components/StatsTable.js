import React from 'react';

const StatsTable = ({ stats }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Jersey Number</th>
          <th>Shot Type</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat, index) => (
          <tr key={index}>
            <td>{stat.jerseyNumber}</td>
            <td>{stat.shotType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatsTable;
