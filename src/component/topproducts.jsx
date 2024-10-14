import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; // Replace with the path to your dataset

const TopSellingProd = ({ year }) => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Filter the dataset by year and aggregate top products by quantity sold
    const filteredData = salesData.filter((item) => item.Year === year);

    // Sort the products by quantity sold and pick the top 5
    const sortedProducts = filteredData
      .sort((a, b) => b.Quantity - a.Quantity)
      .slice(0, 5); // Get the top 5 products

    // Format the data for Recharts
    const formattedData = sortedProducts.map((item) => ({
      name: item['Product Name'], // Product name
      quantity: item.Quantity, // Quantity sold
    }));

    setTopProducts(formattedData);
  }, [year]); // Re-run this effect whenever the year changes

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={topProducts}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSellingProd;
