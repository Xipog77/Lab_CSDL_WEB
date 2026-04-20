import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  SearchOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import CustomerSearch from './components/CustomerSearch';
import OrderSearch from './components/OrderSearch';
import CustomerStatistics from './components/CustomerStatistics';
import OrderStatistics from './components/OrderStatistics';
import ProductStatistics from './components/ProductStatistics';
import './App.css';

const { Header, Sider, Content, Footer } = Layout;

/**
 * Main App Component
 * Dashboard for ClassicModels Analysis
 */
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('customer-search');

  const menuItems = [
    {
      key: 'search',
      label: 'Search',
      icon: <SearchOutlined />,
      children: [
        { key: 'customer-search', label: 'Customer Search' },
        { key: 'order-search', label: 'Order Search' },
      ],
    },
    {
      key: 'statistics',
      label: 'Statistics',
      icon: <BarChartOutlined />,
      children: [
        { key: 'customer-stats', label: 'Customer Statistics' },
        { key: 'order-stats', label: 'Order Statistics' },
        { key: 'product-stats', label: 'Product Statistics' },
      ],
    },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'customer-search':
        return <CustomerSearch />;
      case 'order-search':
        return <OrderSearch />;
      case 'customer-stats':
        return <CustomerStatistics />;
      case 'order-stats':
        return <OrderStatistics />;
      case 'product-stats':
        return <ProductStatistics />;
      default:
        return <CustomerSearch />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        onBreakpoint={(broken) => setCollapsed(broken)}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo">
          <h2 style={{ color: 'white', margin: 0, padding: '16px', textAlign: 'center' }}>
            ClassicModels
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={(e) => setCurrentPage(e.key)}
          selectedKeys={[currentPage]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h3 style={{ margin: 0, color: '#1890ff' }}>
            {currentPage === 'customer-search' && 'Customer Search'}
            {currentPage === 'order-search' && 'Order Search'}
            {currentPage === 'customer-stats' && 'Customer Statistics & Pivot Tables'}
            {currentPage === 'order-stats' && 'Order Statistics & Analytics'}
            {currentPage === 'product-stats' && 'Product Statistics & Analytics'}
          </h3>
        </Header>

        <Content style={{ margin: '0' }}>
          {renderContent()}
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: '#f0f2f5',
            borderTop: '1px solid #d9d9d9',
          }}
        >
          ClassicModels Dashboard ©2024 • RESTful API with ORM • Data Analytics Platform
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;