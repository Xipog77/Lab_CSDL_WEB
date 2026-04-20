import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development
const mockCustomers = [
  {
    customer_number: 103,
    customer_name: 'Atelier graphique',
    contact_last_name: 'Schmitt',
    contact_first_name: 'Carine',
    phone: '40.32.2555',
    address_line1: '54, rue Royale',
    city: 'Nantes',
    country: 'France',
    credit_limit: 21000.00
  },
  {
    customer_number: 112,
    customer_name: 'Signal Gift Stores',
    contact_last_name: 'King',
    contact_first_name: 'Jean',
    phone: '7025551838',
    address_line1: '8489 Strong St.',
    city: 'Las Vegas',
    country: 'USA',
    credit_limit: 71800.00
  },
  {
    customer_number: 114,
    customer_name: 'Australian Collectors, Co.',
    contact_last_name: 'Ferguson',
    contact_first_name: 'Peter',
    phone: '03 9520 4555',
    address_line1: '636 St Kilda Road',
    city: 'Melbourne',
    country: 'Australia',
    credit_limit: 117300.00
  },
  {
    customer_number: 119,
    customer_name: 'La Rochelle Gifts',
    contact_last_name: 'Labrune',
    contact_first_name: 'Janine',
    phone: '40.67.8555',
    address_line1: '67, rue des Cinquante Otages',
    city: 'Nantes',
    country: 'France',
    credit_limit: 118200.00
  },
  {
    customer_number: 121,
    customer_name: 'Baane Mini Imports',
    contact_last_name: 'Bergulfsen',
    contact_first_name: 'Jonas',
    phone: '07-98 9555',
    address_line1: 'Erling Skakkes gate 78',
    city: 'Stavern',
    country: 'Norway',
    credit_limit: 81700.00
  }
];

const mockOrders = [
  {
    order_number: 10100,
    order_date: '2003-01-06',
    required_date: '2003-01-13',
    shipped_date: '2003-01-10',
    status: 'Shipped',
    customer_name: 'Atelier graphique',
    customer_id: 103
  },
  {
    order_number: 10101,
    order_date: '2003-01-09',
    required_date: '2003-01-18',
    shipped_date: '2003-01-11',
    status: 'Shipped',
    customer_name: 'Signal Gift Stores',
    customer_id: 112
  },
  {
    order_number: 10102,
    order_date: '2003-01-10',
    required_date: '2003-01-18',
    shipped_date: null,
    status: 'In Process',
    customer_name: 'Australian Collectors, Co.',
    customer_id: 114
  },
  {
    order_number: 10103,
    order_date: '2003-01-29',
    required_date: '2003-02-07',
    shipped_date: null,
    status: 'Shipped',
    customer_name: 'La Rochelle Gifts',
    customer_id: 119
  },
  {
    order_number: 10104,
    order_date: '2003-01-31',
    required_date: '2003-02-09',
    shipped_date: null,
    status: 'Shipped',
    customer_name: 'Baane Mini Imports',
    customer_id: 121
  }
];

const mockProducts = [
  {
    product_code: 'S10_1678',
    product_name: '1969 Harley Davidson Ultimate Chopper',
    product_line: 'Motorcycles',
    product_scale: '1:10',
    product_vendor: 'Min Lin Diecast',
    product_description: 'This replica features working kickstand, front suspension, gear-shift lever, footbrake lever, drive chain, wheels and steering. All parts are particularly delicate due to their precise scale and require special care and attention.',
    quantity_in_stock: 7933,
    buy_price: 48.81,
    msrp: 95.70
  },
  {
    product_code: 'S10_1949',
    product_name: '1952 Alpine Renault 1300',
    product_line: 'Classic Cars',
    product_scale: '1:10',
    product_vendor: 'Classic Metal Creations',
    product_description: 'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',
    quantity_in_stock: 7305,
    buy_price: 98.58,
    msrp: 214.30
  },
  {
    product_code: 'S10_2016',
    product_name: '1996 Moto Guzzi 1100i',
    product_line: 'Motorcycles',
    product_scale: '1:10',
    product_vendor: 'Highway 66 Mini Classics',
    product_description: 'Official Moto Guzzi logos and insignias, saddle bags located on side of motorcycle, detailed engine, working steering, working suspension, two leather seats, luggage rack, dual exhaust pipes, small saddle bag located on handle bars, two-tone paint with chrome accents, superior die-cast detail , rotating wheels , working kick stand, diecast metal with plastic parts and baked enamel finish.',
    quantity_in_stock: 6625,
    buy_price: 68.99,
    msrp: 118.94
  }
];

const mockCustomerStatistics = [
  {
    customer__customer_number: 103,
    customer__customer_name: 'Atelier graphique',
    total_orders: 5,
    total_spent: 22314.36,
    average_order: 4462.87
  },
  {
    customer__customer_number: 112,
    customer__customer_name: 'Signal Gift Stores',
    total_orders: 8,
    total_spent: 80180.98,
    average_order: 10022.62
  },
  {
    customer__customer_number: 114,
    customer__customer_name: 'Australian Collectors, Co.',
    total_orders: 5,
    total_spent: 180585.07,
    average_order: 36117.01
  },
  {
    customer__customer_number: 119,
    customer__customer_name: 'La Rochelle Gifts',
    total_orders: 7,
    total_spent: 116949.19,
    average_order: 16707.03
  },
  {
    customer__customer_number: 121,
    customer__customer_name: 'Baane Mini Imports',
    total_orders: 4,
    total_spent: 104224.79,
    average_order: 26056.20
  }
];

const mockCustomerPivot = [
  { country: 'USA', total_customers: 36, total_credit_limit: 3588000.00, total_orders: 150 },
  { country: 'France', total_customers: 12, total_credit_limit: 1122000.00, total_orders: 45 },
  { country: 'Australia', total_customers: 5, total_credit_limit: 630000.00, total_orders: 20 },
  { country: 'Norway', total_customers: 3, total_credit_limit: 245100.00, total_orders: 12 },
  { country: 'Germany', total_customers: 13, total_credit_limit: 1842000.00, total_orders: 60 }
];

const mockOrderStatistics = [
  { status: 'Shipped', count: 303 },
  { status: 'In Process', count: 6 },
  { status: 'Cancelled', count: 6 },
  { status: 'On Hold', count: 4 },
  { status: 'Disputed', count: 4 },
  { status: 'Resolved', count: 4 }
];

const mockOrderStatisticsByCustomer = [
  {
    customer__customer_name: 'Euro+ Shopping Channel',
    total_orders: 26,
    total_amount: 912294.11
  },
  {
    customer__customer_name: 'Mini Gifts Distributors Ltd.',
    total_orders: 17,
    total_amount: 654858.06
  },
  {
    customer__customer_name: 'Australian Collectors, Co.',
    total_orders: 5,
    total_amount: 180585.07
  },
  {
    customer__customer_name: 'Muscle Machine Inc',
    total_orders: 14,
    total_amount: 177913.95
  },
  {
    customer__customer_name: 'La Rochelle Gifts',
    total_orders: 7,
    total_amount: 116949.19
  }
];

const mockOrderStatisticsByDate = [
  { order_date: '2003-01', total_orders: 15, total_amount: 101234.56 },
  { order_date: '2003-02', total_orders: 22, total_amount: 156789.12 },
  { order_date: '2003-03', total_orders: 18, total_amount: 134567.89 },
  { order_date: '2003-04', total_orders: 25, total_amount: 189012.34 },
  { order_date: '2003-05', total_orders: 20, total_amount: 145678.90 }
];

const mockProductStatistics = [
  {
    product_name: '1969 Harley Davidson Ultimate Chopper',
    product_line: 'Motorcycles',
    total_quantity: 1057,
    total_revenue: 50798.36
  },
  {
    product_name: '1952 Alpine Renault 1300',
    product_line: 'Classic Cars',
    total_quantity: 961,
    total_revenue: 214800.00
  },
  {
    product_name: '1996 Moto Guzzi 1100i',
    product_line: 'Motorcycles',
    total_quantity: 899,
    total_revenue: 67200.00
  }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Customer API with mock data
export const customerAPI = {
  getAll: async (page = 1) => {
    await delay(500);
    const pageSize = 50;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = mockCustomers.slice(start, end);
    return {
      data: {
        results,
        count: mockCustomers.length,
        next: end < mockCustomers.length ? `?page=${page + 1}` : null,
        previous: page > 1 ? `?page=${page - 1}` : null
      }
    };
  },
  search: async (params) => {
    await delay(300);
    let filtered = [...mockCustomers];

    if (params.customer_name) {
      filtered = filtered.filter(c =>
        c.customer_name.toLowerCase().includes(params.customer_name.toLowerCase())
      );
    }
    if (params.country) {
      filtered = filtered.filter(c =>
        c.country.toLowerCase().includes(params.country.toLowerCase())
      );
    }
    if (params.city) {
      filtered = filtered.filter(c =>
        c.city.toLowerCase().includes(params.city.toLowerCase())
      );
    }
    if (params.min_credit) {
      filtered = filtered.filter(c =>
        parseFloat(c.credit_limit || 0) >= parseFloat(params.min_credit)
      );
    }

    return {
      data: {
        results: filtered,
        count: filtered.length
      }
    };
  },
  getStatistics: async () => {
    await delay(300);
    return { data: mockCustomerStatistics };
  },
  getPivotByCountry: async () => {
    await delay(300);
    return { data: mockCustomerPivot };
  },
};

// Order API with mock data
export const orderAPI = {
  getAll: async (page = 1) => {
    await delay(500);
    const pageSize = 50;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = mockOrders.slice(start, end);
    return {
      data: {
        results,
        count: mockOrders.length,
        next: end < mockOrders.length ? `?page=${page + 1}` : null,
        previous: page > 1 ? `?page=${page - 1}` : null
      }
    };
  },
  search: async (params) => {
    await delay(300);
    let filtered = [...mockOrders];

    if (params.customer_id) {
      filtered = filtered.filter(o => o.customer_id === parseInt(params.customer_id));
    }
    if (params.status) {
      filtered = filtered.filter(o => o.status === params.status);
    }
    if (params.from_date) {
      filtered = filtered.filter(o => new Date(o.order_date) >= new Date(params.from_date));
    }
    if (params.to_date) {
      filtered = filtered.filter(o => new Date(o.order_date) <= new Date(params.to_date));
    }

    return {
      data: {
        results: filtered,
        count: filtered.length
      }
    };
  },
  getStatisticsByDate: async () => {
    await delay(300);
    return { data: mockOrderStatisticsByDate };
  },
  getStatisticsByCustomer: async () => {
    await delay(300);
    return { data: mockOrderStatisticsByCustomer };
  },
  getStatisticsByStatus: async () => {
    await delay(300);
    return { data: mockOrderStatistics };
  },
  getPivotByMonth: async () => {
    await delay(300);
    return { data: [] };
  },
};

// Product API with mock data
export const productAPI = {
  getAll: async (page = 1) => {
    await delay(500);
    const pageSize = 50;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = mockProducts.slice(start, end);
    return {
      data: {
        results,
        count: mockProducts.length,
        next: end < mockProducts.length ? `?page=${page + 1}` : null,
        previous: page > 1 ? `?page=${page - 1}` : null
      }
    };
  },
  getByLine: async (lineCode) => {
    await delay(300);
    let filtered = mockProducts;
    if (lineCode) {
      filtered = mockProducts.filter(p => p.product_line === lineCode);
    }
    return { data: filtered };
  },
  getStatistics: async () => {
    await delay(300);
    return { data: mockProductStatistics };
  },
};

// Payment API with mock data
export const paymentAPI = {
  getAll: async (page = 1) => {
    await delay(500);
    return {
      data: {
        results: [],
        count: 0,
        next: null,
        previous: null
      }
    };
  },
  getStatistics: async () => {
    await delay(300);
    return { data: [] };
  },
  getByCustomer: async (customerId) => {
    await delay(300);
    return { data: [] };
  },
};

// Product Line API with mock data
export const productLineAPI = {
  getAll: async () => {
    await delay(300);
    return {
      data: [
        { product_line: 'Classic Cars', text_description: 'Attention car enthusiasts: Make your wildest car ownership dreams come true. Whether you are looking for street legal classic convertibles or turbocharged roadsters, you will find them all here at ClassicCars.com.' },
        { product_line: 'Motorcycles', text_description: 'Our motorcycles are state of the art replicas of classic as well as contemporary motorcycle legends such as Harley Davidson, Ducati and Vespa. Models contain stunning details such as official logos, rotating wheels, working kickstand, front suspension, gear-shift lever, footbrake lever, and drive chain.' },
        { product_line: 'Planes', text_description: 'Unique, diecast airplane and helicopter replicas suitable for collections, as well as home and office decor. These high quality replicas are handcrafted and handpainted to perfection with an incredible attention to detail.' }
      ]
    };
  },
};

export default api;
