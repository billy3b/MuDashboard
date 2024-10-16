import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import salesData from '../assets/dataset.json'; // Import your dataset

const MonthlySalesChart = ({ year }) => {
  const [monthlySales, setMonthlySales] = useState([]);

  // Mapping of month names to their respective order
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const processData = () => {
      // Filter sales data based on the selected year
      const filteredData = salesData.filter((item) => item.Year === year);

      // Create an object to store the sales for each month
      const salesByMonth = {};

      // Loop through the filtered sales data to aggregate sales month by month
      filteredData.forEach((item) => {
        const month = item.MonthName; 
        const monthYearKey = `${month} ${item.Year}`; 

        if (salesByMonth[monthYearKey]) {
          salesByMonth[monthYearKey] += item.Sales;
        } else {
          salesByMonth[monthYearKey] = item.Sales;
        }
      });

      // Convert the aggregated data into an array and sort by month order
      const formattedData = Object.keys(salesByMonth).map((monthYearKey) => {
        const [month] = monthYearKey.split(' ');
        return {
          month: monthYearKey,
          totalSales: salesByMonth[monthYearKey],
          monthIndex: monthOrder.indexOf(month) // Use this to sort later
        };
      });

      // Sort the data by the monthIndex
      formattedData.sort((a, b) => a.monthIndex - b.monthIndex);

      setMonthlySales(formattedData);
    };

    processData();
  }, [year]); // Re-run when the year changes

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={monthlySales}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlySalesChart;
