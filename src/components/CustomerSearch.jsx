import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Space, Card, Row, Col, Statistic } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { customerAPI } from '../services/api';
import './Search.css';

/**
 * Advanced search component for customers
 */
const CustomerSearch = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50, total: 0 });

  // Filter states
  const [filters, setFilters] = useState({
    customer_name: '',
    country: '',
    city: '',
    min_credit: '',
    has_orders: false,
  });

  // Statistics
  const [statistics, setStatistics] = useState({
    total_customers: 0,
    total_credit: 0,
  });

  const columns = [
    { title: 'Customer', dataIndex: 'customer_name', key: 'customer_name', width: 150 },
    { title: 'Contact', dataIndex: 'contact_first_name', key: 'contact_first_name', width: 100 },
    { title: 'City', dataIndex: 'city', key: 'city', width: 100 },
    { title: 'Country', dataIndex: 'country', key: 'country', width: 100 },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 120 },
    {
      title: 'Credit Limit',
      dataIndex: 'credit_limit',
      key: 'credit_limit',
      width: 100,
      render: (value) => value ? `$${parseFloat(value).toLocaleString()}` : '-',
    },
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await customerAPI.search(
        Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v !== false))
      );
      setCustomers(response.data.results || response.data);
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
      customer_name: '',
      country: '',
      city: '',
      min_credit: '',
      has_orders: false,
    });
  };

  const loadStatistics = async () => {
    try {
      const response = await customerAPI.getStatistics();
      if (response.data && response.data.length > 0) {
        const total = response.data.length;
        const totalCredit = response.data.reduce((sum, item) => sum + parseFloat(item.credit_limit || 0), 0);
        setStatistics({
          total_customers: total,
          total_credit: totalCredit,
        });
      }
    } catch (error) {
      console.error('Statistics error:', error);
    }
  };

  useEffect(() => {
    loadStatistics();
    handleSearch();
  }, []);

  return (
    <div className="search-container">
      <Card title="Customer Search" className="search-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Customer Name"
              value={filters.customer_name}
              onChange={(e) => setFilters({ ...filters, customer_name: e.target.value })}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Country"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Min Credit Limit"
              type="number"
              value={filters.min_credit}
              onChange={(e) => setFilters({ ...filters, min_credit: e.target.value })}
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

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="Total Customers" value={statistics.total_customers} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="Total Credit Limit"
              value={`$${statistics.total_credit.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
            />
          </Col>
        </Row>

        <div style={{ marginTop: '24px' }}>
          <Table
            columns={columns}
            dataSource={customers}
            loading={loading}
            rowKey="customer_number"
            pagination={pagination}
            scroll={{ x: 800 }}
          />
        </div>
      </Card>
    </div>
  );
};

export default CustomerSearch;
