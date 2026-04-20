import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Empty } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { orderAPI, productAPI } from '../services/api';
import './Statistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Order Statistics and Charts component
 */
const OrderStatistics = () => {
  const [statisticsByDate, setStatisticsByDate] = useState([]);
  const [statisticsByStatus, setStatisticsByStatus] = useState([]);
  const [statisticsByCustomer, setStatisticsByCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'Customer', dataIndex: 'customer__customer_name', key: 'customer_name', width: 150 },
    {
      title: 'Total Orders',
      dataIndex: 'total_orders',
      key: 'total_orders',
      width: 120,
      sorter: (a, b) => a.total_orders - b.total_orders,
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 150,
      render: (value) => `$${parseFloat(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      sorter: (a, b) => parseFloat(a.total_amount || 0) - parseFloat(b.total_amount || 0),
    },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const [dateStats, statusStats, customerStats] = await Promise.all([
        orderAPI.getStatisticsByDate(),
        orderAPI.getStatisticsByStatus(),
        orderAPI.getStatisticsByCustomer(),
      ]);
      setStatisticsByDate(dateStats.data || []);
      setStatisticsByStatus(statusStats.data || []);
      setStatisticsByCustomer(customerStats.data || []);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Chart data for orders by status
  const statusChartData = {
    labels: statisticsByStatus.map((item) => item.status),
    datasets: [
      {
        label: 'Number of Orders',
        data: statisticsByStatus.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  // Chart data for top 10 customers by spending
  const topCustomers = statisticsByCustomer.slice(0, 10);
  const customerChartData = {
    labels: topCustomers.map((item) => item.customer__customer_name),
    datasets: [
      {
        label: 'Total Spending',
        data: topCustomers.map((item) => parseFloat(item.total_amount || 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="statistics-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Orders by Status" loading={loading} className="chart-card">
            {statisticsByStatus.length > 0 ? (
              <Pie data={statusChartData} options={{ responsive: true, maintainAspectRatio: true }} />
            ) : (
              <Empty description="No data available" />
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Top 10 Customers by Spending" loading={loading} className="chart-card">
            {topCustomers.length > 0 ? (
              <Bar
                data={customerChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  indexAxis: 'y',
                  scales: {
                    x: {
                      ticks: {
                        callback: function (value) {
                          return '$' + value.toLocaleString();
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <Empty description="No data available" />
            )}
          </Card>
        </Col>
      </Row>

      <Card title="Top Customers Statistics" loading={loading} className="statistics-card">
        {statisticsByCustomer.length > 0 ? (
          <Table
            columns={columns}
            dataSource={statisticsByCustomer.slice(0, 20)}
            rowKey={(record) => record.customer__customer_name}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 600 }}
          />
        ) : (
          <Empty description="No data available" />
        )}
      </Card>
    </div>
  );
};

export default OrderStatistics;
