"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../app/layout';
import axios from 'axios';

const Page: React.FC = () => {
  const [data, setData] = useState([]);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('http://localhost:8080/data/json', {}, {
        headers: {
          'Authorization': 'Basic ' + btoa('user:password'),
        },
      });
      setShowChild(true);
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleDownload = async () => {
    const result = await axios.post('http://localhost:8080/data/csv', {}, {
      headers: {
        'Authorization': 'Basic ' + btoa('user:password'),
      },
    });
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.csv');
    document.body.appendChild(link);
    link.click();
  };

  if (!showChild) {
    return <div></div>;
  }

  return (
    <Layout>
      <table id="dataTable">
        <thead>
          <tr>
            <th>Client Type</th>
            <th>Client Number</th>
            <th>Account Number</th>
            <th>Subaccount Number</th>
            <th>Exchange Code</th>
            <th>Product Group Code</th>
            <th>Symbol</th>
            <th>Expiration Date</th>
            <th>Total Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.clientType}</td>
            <td>{item.clientNumber}</td>
            <td>{item.accountNumber}</td>
            <td>{item.subAccountNumber}</td>
            <td>{item.exchangeCode}</td>
            <td>{item.productGroupCode}</td>
            <td>{item.symbol}</td>
            <td>{`${item.expirationDate.substring(0, 4)}-${item.expirationDate.substring(4, 6)}-${item.expirationDate.substring(6, 8)}`}</td>
            <td>{item.totalTransactionAmount}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleDownload}>Download CSV</button>
      </div>
    </Layout>
  );
};

export default Page;