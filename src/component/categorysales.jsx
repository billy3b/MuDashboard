import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import salesData from '../assets/dataset.json'; // Replace with the path to your dataset

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CategorySales = ({ year }) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Filter the dataset by year and aggregate category-wise sales
    const filteredData = salesData.filter((item) => item.Year === year);

    // Create an object to hold sales for each category
    const salesByCategory = {
      Technology: 0,
      Furniture: 0,
      'Office Supplies': 0,
    };

    // Aggregate sales for each category
    filteredData.forEach((item) => {
      salesByCategory[item.Category] += item.Sales;
    });

    // Convert the salesByCategory object to an array format that Recharts can use
    const formattedData = Object.keys(salesByCategory).map((category) => ({
      name: category,
      value: salesByCategory[category],
    }));

    setCategoryData(formattedData);
  }, [year]); 

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={categoryData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
      >
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategorySales;
