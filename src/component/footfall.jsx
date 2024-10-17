import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; // Replace with the path to your dataset

const FootfallChart = ({ year }) => {
  const [footfallData, setFootfallData] = useState([]);

  useEffect(() => {
    // Filter the dataset by year
    const filteredData = salesData.filter((item) => item.Year === year);

    // Create an object to hold distinct customers for each month
    const customersByMonthName = {};

    //aggregate distinct customers by MonthName
    filteredData.forEach((item) => {
      const monthName = item.MonthName; 
      const customerId = item['Customer ID'];

      if (!customersByMonthName[monthName]) {
        customersByMonthName[monthName] = new Set();
      }
      customersByMonthName[monthName].add(customerId); 
    });

    // Format the data for the chart: MonthName and footfall (distinct customer count)
    const formattedData = Object.keys(customersByMonthName).map((monthName) => ({
      month: monthName, 
      footfall: customersByMonthName[monthName].size, 
    }));

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    formattedData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

    setFootfallData(formattedData);
  }, [year]);

  return (
    <ResponsiveContainer width="100%" height={130} >
      <LineChart
        data={footfallData}
        margin={{
          top: 10, right: 35, left: 10, bottom: 0,
        }}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="footfall" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FootfallChart;
