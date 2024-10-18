import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; 

const TopSellingProd = ({ year }) => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Filter the dataset by year
    const filteredData = salesData.filter((item) => item.Year === year);

    // object to store the sales totals by product name
    const salesByProduct = {};

    // Loop through the filtered data and sum sales by product name
    filteredData.forEach((item) => {
      const productName = item['Product Name'];
      if (salesByProduct[productName]) {
        salesByProduct[productName] += item.Sales; 
      } else {
        salesByProduct[productName] = item.Sales; // Initialize sales for new product
      }
    });

    // Convert the salesByProduct object into an array and sort by sales value
    const sortedProducts = Object.keys(salesByProduct)
      .map((productName) => ({
        name: productName.slice(0, 20), 
        sales: salesByProduct[productName], 
      }))
      .sort((a, b) => b.sales - a.sales) 
      .slice(0, 5); 

    setTopProducts(sortedProducts);
  }, [year]); 

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={topProducts}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: '10px' }} />
        <Bar dataKey="sales" fill="#5ec6d8" /> 
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSellingProd;
