import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; // Replace with the path to your dataset

const FootfallLineChart = ({ year }) => {
  const [footfallData, setFootfallData] = useState([]);

  useEffect(() => {
    // Filter the dataset by year
    const filteredData = salesData.filter((item) => item.Year === year);

    // Create an object to hold distinct customers for each month
    const customersByMonth = {};

    // Loop through the filtered data to aggregate distinct customers month by month
    filteredData.forEach((item) => {
      const month = item.Month; // Assuming `Month` is a numeric value (e.g., 1 for Jan, 2 for Feb, etc.)
      const customerId = item['Customer ID'];

      if (!customersByMonth[month]) {
        customersByMonth[month] = new Set(); // Use a Set to store unique customer IDs
      }
      customersByMonth[month].add(customerId); // Add the customer ID to the month
    });

    // Format the data for the chart: month and footfall (distinct customer count)
    const formattedData = Object.keys(customersByMonth).map((month) => ({
      month: new Date(year, month - 1).toLocaleString('default', { month: 'short' }), // Format month as 'Jan', 'Feb', etc.
      footfall: customersByMonth[month].size, // Number of distinct customers
    }));

    // Sort the formatted data by month (1-12)
    formattedData.sort((a, b) => new Date(year, a.month).getMonth() - new Date(year, b.month).getMonth());

    setFootfallData(formattedData);
  }, [year]); // Re-run this effect whenever the year changes

  return (
    <ResponsiveContainer width="100%" height={180} width={450}>
      <LineChart
        data={footfallData}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="month" />
        <YAxis label={{ value: "No. of Customers", angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="footfall" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FootfallLineChart;
