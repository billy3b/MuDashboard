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
  }, [year]); 

  return (
    <ResponsiveContainer width={260} height={210}>
      <PieChart>
        <Pie
          data={profitLossData}
          cx="50%" 
          cy="80%"
          innerRadius={40} 
          outerRadius={60} 
          startAngle={180}  // Start at 180 degrees (top left)
          endAngle={0} 
          fill="#8884d8"
          dataKey="value" 
        >
          {profitLossData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend 
        layout="horizontal" 
        align="left" 
        verticalAlign="bottom" 
        wrapperStyle={{ paddingBottom:'100px' }}/>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProfitLossChart;
