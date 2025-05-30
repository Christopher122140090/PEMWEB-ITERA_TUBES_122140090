// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import LowStockAlert from '../components/LowStockAlert';
import { getProducts, getSales } from '../services/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getProducts(), getSales()])
      .then(([productsRes, salesRes]) => {
        setProducts(productsRes.data);
        setSales(salesRes.data);
        setError(null);
      })
      .catch(() => setError('Gagal memuat data statistik'))
      .finally(() => setLoading(false));
  }, []);

  // Statistik
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + Number(p.stock), 0);
  const lowStockCount = products.filter(p => Number(p.stock) <= 5).length;
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const salesThisMonth = sales.filter(s => {
    const d = new Date(s.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });
  const totalSalesThisMonth = salesThisMonth.reduce((sum, s) => sum + (s.price * s.quantity), 0);

  // Data chart penjualan per bulan (12 bulan terakhir)
  const monthlySales = Array(12).fill(0);
  sales.forEach(s => {
    const d = new Date(s.date);
    if (d.getFullYear() === thisYear) {
      monthlySales[d.getMonth()] += s.price * s.quantity;
    }
  });
  const monthLabels = ['Jainisalahn', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dataLine = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Penjualan Bulanan',
        data: monthlySales,
        borderColor: '#6A5CFF',
        backgroundColor: 'rgba(106, 92, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Pie chart: kategori berdasarkan bulan (jumlah transaksi per bulan)
  const salesCountPerMonth = Array(12).fill(0);
  sales.forEach(s => {
    const d = new Date(s.date);
    if (d.getFullYear() === thisYear) {
      salesCountPerMonth[d.getMonth()] += 1;
    }
  });
  const dataPie = {
    labels: monthLabels,
    datasets: [
      {
        data: salesCountPerMonth,
        backgroundColor: [
          '#6A5CFF', '#3B82F6', '#10B981', '#FBBF24', '#EF4444',
          '#A78BFA', '#F472B6', '#F59E42', '#34D399', '#60A5FA', '#F87171', '#6366F1'
        ],
        hoverOffset: 30,
      },
    ],
  };

  return (
    <Box style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 16, textAlign: 'center' }}>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4" color="primary" style={{ marginTop: 8 }}>
              {totalProducts}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 16, textAlign: 'center' }}>
            <Typography variant="h6">Total Stock</Typography>
            <Typography variant="h4" color="secondary" style={{ marginTop: 8 }}>
              {totalStock}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 16, textAlign: 'center' }}>
            <Typography variant="h6">Low Stock Items</Typography>
            <Typography variant="h4" color="error" style={{ marginTop: 8 }}>
              {lowStockCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 16, textAlign: 'center' }}>
            <Typography variant="h6">Total Sales (Month)</Typography>
            <Typography variant="h4" color="success" style={{ marginTop: 8 }}>
              Rp {totalSalesThisMonth.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Penjualan Bulanan
            </Typography>
            <Line data={dataLine} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Jumlah Transaksi per Bulan
            </Typography>
            <Pie data={dataPie} />
          </Paper>
        </Grid>

        {/* Low Stock Alerts */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Low Stock Alerts
            </Typography>
            <LowStockAlert />
          </Paper>
        </Grid>
      </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
