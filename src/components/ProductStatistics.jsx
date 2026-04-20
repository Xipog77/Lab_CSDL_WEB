import React, { useState, useEffect } from 'react';
import { Card, Table, Empty } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { productAPI } from '../services/api';
import './Statistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Product Statistics component
 */
const ProductStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'Product Name', dataIndex: 'product_name', key: 'product_name', width: 150, ellipsis: true },
    { title: 'Product Line', dataIndex: 'product_line', key: 'product_line', width: 120 },
    {
      title: 'Total Quantity',
      dataIndex: 'total_quantity',
      key: 'total_quantity',
      width: 120,
      sorter: (a, b) => a.total_quantity - b.total_quantity,
    },
    {
      title: 'Total Revenue',
      dataIndex: 'total_revenue',
      key: 'total_revenue',
      width: 150,
      render: (value) => `$${parseFloat(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      sorter: (a, b) => parseFloat(a.total_revenue || 0) - parseFloat(b.total_revenue || 0),
    },
    {
      title: 'Orders Count',
      dataIndex: 'orders_count',
      key: 'orders_count',
      width: 120,
      sorter: (a, b) => a.orders_count - b.orders_count,
    },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getStatistics();
      setStatistics(response.data || []);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Chart data for top products
  const topProducts = statistics.slice(0, 10);
  const chartData = {
    labels: topProducts.map((item) => item.product_name),
    datasets: [
      {
        label: 'Total Revenue',
        data: topProducts.map((item) => parseFloat(item.total_revenue || 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="statistics-container">
      <Card title="Top 10 Products by Revenue" loading={loading} className="chart-card">
        {topProducts.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
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

      <Card title="Product Statistics" loading={loading} className="statistics-card">
        {statistics.length > 0 ? (
          <Table
            columns={columns}
            dataSource={statistics}
            rowKey={(record) => record.product_name}
            pagination={{ pageSize: 20 }}
            scroll={{ x: 800 }}
          />
        ) : (
          <Empty description="No data available" />
        )}
      </Card>
    </div>
  );
};

export default ProductStatistics;
