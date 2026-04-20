import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Space, Card, Row, Col, Select, DatePicker } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { orderAPI } from '../services/api';
import dayjs from 'dayjs';
import './Search.css';

/**
 * Advanced search component for orders
 */
const OrderSearch = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50, total: 0 });

  // Filter states
  const [filters, setFilters] = useState({
    customer_id: '',
    status: '',
    from_date: null,
    to_date: null,
  });

  const statusOptions = [
    { label: 'Shipped', value: 'Shipped' },
    { label: 'In Process', value: 'In Process' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Disputed', value: 'Disputed' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'On Hold', value: 'On Hold' },
  ];

  const columns = [
    { title: 'Order #', dataIndex: 'order_number', key: 'order_number', width: 80 },
    { title: 'Customer', dataIndex: 'customer_name', key: 'customer_name', width: 150 },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
      width: 100,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <span style={{
          color: status === 'Shipped' ? 'green' : status === 'Cancelled' ? 'red' : 'orange'
        }}>
          {status}
        </span>
      ),
    },
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const searchParams = {};
      if (filters.customer_id) searchParams.customer_id = filters.customer_id;
      if (filters.status) searchParams.status = filters.status;
      if (filters.from_date) searchParams.from_date = filters.from_date.format('YYYY-MM-DD');
      if (filters.to_date) searchParams.to_date = filters.to_date.format('YYYY-MM-DD');

      const response = await orderAPI.search(searchParams);
      setOrders(response.data.results || response.data);
      setPagination({
        ...pagination,
        total: response.data.count || response.data.length,
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      customer_id: '',
      status: '',
      from_date: null,
      to_date: null,
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="search-container">
      <Card title="Order Search" className="search-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Customer ID"
              type="number"
              value={filters.customer_id}
              onChange={(e) => setFilters({ ...filters, customer_id: e.target.value })}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Select Status"
              value={filters.status || undefined}
              onChange={(value) => setFilters({ ...filters, status: value })}
              options={statusOptions}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <DatePicker
              placeholder="From Date"
              value={filters.from_date}
              onChange={(date) => setFilters({ ...filters, from_date: date })}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <DatePicker
              placeholder="To Date"
              value={filters.to_date}
              onChange={(date) => setFilters({ ...filters, to_date: date })}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24}>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                loading={loading}
              >
                Search
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                Reset
              </Button>
            </Space>
          </Col>
        </Row>

        <div style={{ marginTop: '24px' }}>
          <Table
            columns={columns}
            dataSource={orders}
            loading={loading}
            rowKey="order_number"
            pagination={pagination}
            scroll={{ x: 600 }}
          />
        </div>
      </Card>
    </div>
  );
};

export default OrderSearch;
