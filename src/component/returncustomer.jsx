import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; 

const ReturningCustomer = ({ year }) => {
  const [returningCustomersData, setReturningCustomersData] = useState([]);

  useEffect(() => {
    
      // Filter the dataset by year
      const filteredData = salesData.filter((item) => item.Year === year);

      // object to hold unique orders by customer
      const ordersByCustomer = {};

      // group by customer and track their orders
      filteredData.forEach((item) => {
        const customerId = item['Customer ID'];
        const orderId = item['Order ID'];
        const segment = item['Segment'];

        // If customer does not exist in ordersByCustomer
        if (!ordersByCustomer[customerId]) {
          ordersByCustomer[customerId] = { segment, orders: new Set() };
        }

        // Add the order ID to the customer's set of orders
        ordersByCustomer[customerId].orders.add(orderId);
      });

      // Debugging
      //console.log("ordersByCustomer:", ordersByCustomer); 

      // Create an object to track the number of returning customers per segment
      const returningCustomersBySegment = {
        Consumer: 0,
        Corporate: 0,
        'Home Office': 0,
      };

      // Count returning customers,customers with more than 1 order per segment
      Object.values(ordersByCustomer).forEach((customer) => {
        if (customer.orders.size > 1) {
          returningCustomersBySegment[customer.segment] += 1;
        }
      });
      console.log("returning customer",returningCustomersBySegment)


      const formattedData = Object.keys(returningCustomersBySegment).map((segment) => ({
        segment,
        returningCustomers: returningCustomersBySegment[segment],
      }));

      setReturningCustomersData(formattedData);

  }, [year]); 
  


  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={returningCustomersData}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="segment" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="returningCustomers" fill="#5ec6d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReturningCustomer;
