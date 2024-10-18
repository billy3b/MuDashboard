import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; 

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; 

const CustomerRetention= ({ year }) => {
  const [retentionData, setRetentionData] = useState([]);

  useEffect(() => {
    const processData = () => {
      // Filter the dataset by year
      const filteredData = salesData.filter((item) => item.Year === year);

      // Object to hold unique orders by customer
      const ordersByCustomer = {};

      // Group by customer and track their orders and segment
      filteredData.forEach((item) => {
        const customerId = item['Customer ID'];
        const orderId = item['Order ID'];
        const segment = item['Segment'];

        // If the customer does not exist in ordersByCustomer, create an entry
        if (!ordersByCustomer[customerId]) {
          ordersByCustomer[customerId] = { segment, orders: new Set() };
        }

        // Add the order ID to the customer's set of orders
        ordersByCustomer[customerId].orders.add(orderId);
      });

      // Create an object to track total customers and returning customers per segment
      const segmentData = {
        Consumer: { totalCustomers: 0, returningCustomers: 0 },
        Corporate: { totalCustomers: 0, returningCustomers: 0 },
        'Home Office': { totalCustomers: 0, returningCustomers: 0 },
      };

      // Count total customers and returning customers per segment
      Object.values(ordersByCustomer).forEach((customer) => {
        const segment = customer.segment;
        segmentData[segment].totalCustomers += 1; // Increment total customers for the segment

        if (customer.orders.size > 1) {
          segmentData[segment].returningCustomers += 1; // Increment returning customers for the segment
        }
      });

      // Calculate retention rate (returning customers / total customers) for each segment
      const formattedData = Object.keys(segmentData).map((segment) => ({
        segment,
        retentionRate:
          segmentData[segment].totalCustomers > 0
            ? (segmentData[segment].returningCustomers / segmentData[segment].totalCustomers) * 100
            : 0, // Calculate retention rate as a percentage
      }));

      setRetentionData(formattedData);
    };

    processData();
  }, [year]);

  return (
    <ResponsiveContainer width="80%" height={220}>
      <PieChart>
        <Pie
          data={retentionData}
          dataKey="retentionRate"
          nameKey="segment"
          cx="50%"
          cy="50%"
          outerRadius={74}
          fill="#5ec6d8"
        >
          {retentionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomerRetention;
