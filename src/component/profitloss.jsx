import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; // Import dataset

// Correct color mapping: Orange for Profit, Blue for Loss
const COLORS = ['#FF8042', '#0088FE']; 

const ProfitLossChart = ({ year }) => {
  const [profitLossData, setProfitLossData] = useState([]);

  useEffect(() => {
    // Filter the dataset by year
    const filteredData = salesData.filter((item) => item.Year === year);

    // Initialize profit and loss totals
    let totalProfit = 0;
    let totalLoss = 0;

    // Sum up profit and loss for the filtered data
    filteredData.forEach((item) => {
      totalProfit += item.Profit; 
      totalLoss += item.Loss; 
    });

    // Use absolute value for loss to ensure correct pie chart rendering
    const formattedData = [
      { name: 'Profit', value: totalProfit },
      { name: 'Loss', value: Math.abs(totalLoss) } 
    ];

    setProfitLossData(formattedData);
  }, [year]); // Re-run when the year changes

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={profitLossData}
          cx="50%" 
          cy="50%"
          innerRadius={60} 
          outerRadius={120} 
          fill="#8884d8"
          dataKey="value" 
        >
          {profitLossData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProfitLossChart;
