import React, { useEffect, useState } from "react";
import { getRevenueByMonth, searchCustomer } from "./api";
import { Line } from "react-chartjs-2";

function App() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getRevenueByMonth().then(res => setData(res.data));
  }, []);

  const handleSearch = async () => {
    const res = await searchCustomer(keyword);
    setCustomers(res.data);
  };

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [{
      label: "Revenue",
      data: data.map(d => d.revenue),
    }]
  };

  return (
    <div>
      <h2>Revenue by Month</h2>
      <Line data={chartData} />

      <h2>Search Customer</h2>
      <input onChange={e => setKeyword(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {customers.map(c => (
          <li key={c.customernumber}>{c.customername}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;