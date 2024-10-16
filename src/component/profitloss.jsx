import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; // Path to your dataset

const COLORS = ['#0088FE', '#FF8042']; // Colors for profit and loss

const ProfitLossChart = ({ year }) => {
  const [profitLossData, setProfitLossData] = useState([]);

  useEffect(() => {
    // Filter the dataset by year
    const filteredData = salesData.filter((item) => item.Year === year);

    let totalProfit = 0;
    let totalLoss = 0;

    filteredData.forEach((item) => {
      totalProfit += item.Profit;
      totalLoss += item.Loss;
    });

    const formattedData = [
      { name: 'Profit', value: totalProfit },
      { name: 'Loss', value: totalLoss }
    ];

    setProfitLossData(formattedData);
  }, [year]); 

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={profitLossData}
          cx="50%" // Center X
          cy="50%" // Center Y
          startAngle={180} // Starting at 180 degrees
          endAngle={0} // Ending at 0 degrees (half circle)
          innerRadius={60} // Adjust for inner space
          outerRadius={120} // Adjust for outer circle size
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
