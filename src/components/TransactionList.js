import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/transactions')
      .then(res => {
        const data = res.data;
        setTransactions(data);
        const monthlySums = Array(12).fill(0);

        data.forEach(t => {
          const month = new Date(t.date).getMonth(); // 0 = Jan, 11 = Dec
          monthlySums[month] += parseFloat(t.amount);
        });

        const chartData = monthlySums.map((sum, index) => ({
          month: new Date(0, index).toLocaleString('default', { month: 'short' }),
          amount: sum
        }));

        setMonthlyData(chartData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Transakcje</h2>

      {/* Tabela transakcji */}
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Kwota</th>
            <th>Data</th>
            <th>Kategoria</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.amount}</td>
              <td>{t.date}</td>
              <td>{t.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Wykres roczny */}
      <h2>Wykres roczny (suma miesięczna)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" name="Kwota" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TransactionsList;
