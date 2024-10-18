import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import salesData from '../assets/dataset.json';
 
const MonthlySalesChart = ({ year }) => {
  const [monthlySales, setMonthlySales] = useState([]);
 
  // Mapping of month names to their respective order
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
  useEffect(() => {
    
      // Filter sales data based on the selected year
      const filteredData = salesData.filter((item) => item.Year === year);
 
      // object to store the sales for each month
      const salesByMonth = {};
 
      // Loop through the filtered sales data to aggregate sales month by month
      filteredData.forEach((item) => {
        const month = item.MonthName;
        if (salesByMonth[month]) {
          salesByMonth[month] += item.Sales;
        } else {
          salesByMonth[month] = item.Sales;
        }
      });
      //console.log(salesByMonth)
 
      // Convert the aggregated data into an array and sort by month order
      const formattedData = Object.keys(salesByMonth).map((month) => ({
        month,
        totalSales: salesByMonth[month],
        monthIndex: monthOrder.indexOf(month)
      }));
 
      formattedData.sort((a, b) => a.monthIndex - b.monthIndex);
 
      setMonthlySales(formattedData);
      
  }, [year]);
 
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={monthlySales}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalSales" />
      </LineChart>
    </ResponsiveContainer>
  );
};
 
export default MonthlySalesChart;