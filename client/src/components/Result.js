import React from 'react';
import './Result.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // Import Recharts components for charting

const data = [
  { name: 'Candidate A', value: 400 },
  { name: 'Candidate B', value: 300 },
  { name: 'Candidate C', value: 300 },
  { name: 'Candidate D', value: 200 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Results = () => {
  return (
    <div className="results-container">
        <br/><br/>
      <h1 className="results-title">Election Results</h1>
      
      <section className="results-summary">
        <h2>Summary</h2>
        <p>Total Votes: 1,200</p>
        <p>Voting Period: January 1, 2024 - January 31, 2024</p>
        <p>Winner: Candidate A</p>
      </section>
      
      <section className="results-chart">
        <h2>Results Breakdown</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </section>
      
      <section className="results-detailed">
        <h2>Detailed Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Votes</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.value}</td>
                <td>{((entry.value / 1200) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Results;
