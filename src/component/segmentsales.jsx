import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import salesData from '../assets/dataset.json'; 

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SegmentWiseSales = ({ year }) => {
  const [segmentData, setSegmentData] = useState([]);

  useEffect(() => {
    // Filter the dataset by year and aggregate segment-wise sales
    const filteredData = salesData.filter((item) => item.Year === year);

    // Create an object to hold sales for each segment
    const salesBySegment = {
      Consumer: 0,
      Corporate: 0,
      'Home Office': 0,
    };

    // Aggregate sales for each segment
    filteredData.forEach((item) => {
      salesBySegment[item.Segment] += item.Sales;
    });

    // Convert the salesBySegment object to an array format that Recharts can use
    const formattedData = Object.keys(salesBySegment).map((segment) => ({
      name: segment,
      value: salesBySegment[segment],
    }));

    setSegmentData(formattedData);
  }, [year]); 

  return (
    <PieChart width={250} height={270}>
      <Pie
        data={segmentData}
        nameKey="name"
        cx="40%"
        cy="47%"
        outerRadius={80}
        fill="#8884d8"
      >
        {segmentData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="horizontal" 
        align="left" 
        verticalAlign="bottom" 
        wrapperStyle={{ paddingBottom:'50px' }} />
    </PieChart>
  );
};

export default SegmentWiseSales;
