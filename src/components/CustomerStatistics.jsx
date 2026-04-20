import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Spin, Empty } from 'antd';
import { customerAPI, orderAPI, productAPI } from '../services/api';
import './Statistics.css';

/**
 * Customer Statistics and Pivot Table component
 */
const CustomerStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pivotData, setPivotData] = useState([]);

  const statisticsColumns = [
    { title: 'Customer Name', dataIndex: 'customer__customer_name', key: 'customer_name', width: 150 },
    {
      title: 'Total Orders',
      dataIndex: 'total_orders',
      key: 'total_orders',
      width: 100,
      sorter: (a, b) => a.total_orders - b.total_orders,
    },
    {
      title: 'Total Spent',
      dataIndex: 'total_spent',
      key: 'total_spent',
      width: 120,
      render: (value) => `$${parseFloat(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      sorter: (a, b) => parseFloat(a.total_spent || 0) - parseFloat(b.total_spent || 0),
    },
    {
      title: 'Avg Order',
      dataIndex: 'average_order',
      key: 'average_order',
      width: 120,
      render: (value) => `$${parseFloat(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
    },
  ];

  const pivotColumns = [
    { title: 'Country', dataIndex: 'country', key: 'country', width: 100 },
    {
      title: 'Total Customers',
      dataIndex: 'total_customers',
      key: 'total_customers',
      width: 150,
      sorter: (a, b) => a.total_customers - b.total_customers,
    },
    {
      title: 'Total Credit Limit',
      dataIndex: 'total_credit_limit',
      key: 'total_credit_limit',
      width: 150,
      render: (value) => `$${parseFloat(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
    },
    {
      title: 'Total Orders',
      dataIndex: 'total_orders',
      key: 'total_orders',
      width: 150,
    },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsResponse, pivotResponse] = await Promise.all([
        customerAPI.getStatistics(),
        customerAPI.getPivotByCountry(),
      ]);
      setStatistics(statsResponse.data || []);
      setPivotData(pivotResponse.data || []);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="statistics-container">
      <Card title="Customer Statistics" loading={loading} className="statistics-card">
        {statistics.length > 0 ? (
          <Table
            columns={statisticsColumns}
            dataSource={statistics}
            rowKey={(record) => record.customer__customer_number}
            pagination={{ pageSize: 20 }}
            scroll={{ x: 600 }}
          />
        ) : (
          <Empty description="No statistics available" />
        )}
      </Card>

      <Card title="Pivot Table: Customers by Country" loading={loading} className="statistics-card">
        {pivotData.length > 0 ? (
          <Table
            columns={pivotColumns}
            dataSource={pivotData}
            rowKey={(record) => record.country}
            pagination={{ pageSize: 20 }}
            scroll={{ x: 600 }}
          />
        ) : (
          <Empty description="No pivot data available" />
        )}
      </Card>
    </div>
  );
};

export default CustomerStatistics;
