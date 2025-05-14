// src/pages/Dashboard.js
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = () => {
  // Data untuk grafik "Inventory Overview"
  const dataLine = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Inventory Overview',
        data: [1200, 1300, 1250, 1400, 1500, 1600, 1550, 1450, 1650, 1700, 1600, 1500],
        borderColor: '#A4A9F2',
        fill: true,
      },
    ],
  };

  // Data untuk grafik "Category Distribution"
  const dataPie = {
    labels: ['T-Shirts', 'Jeans', 'Shirts', 'Dresses', 'Jackets'],
    datasets: [
      {
        data: [400, 250, 150, 100, 50],
        backgroundColor: ['#6A5CFF', '#FF914D', '#32B5B3', '#FFD700', '#FF6347'],
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Statistik Kolom */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Total Items</Typography>
            <Typography variant="h4" sx={{ marginTop: 1 }}>
              1,254
            </Typography>
            <Typography variant="body2" color="green" sx={{ marginTop: 1 }}>
              +12.5% Since last month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Low Stock</Typography>
            <Typography variant="h4" sx={{ marginTop: 1 }} color="red">
              23
            </Typography>
            <Typography variant="body2" color="red" sx={{ marginTop: 1 }}>
              -4.2% Since last week
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4" sx={{ marginTop: 1 }}>
              Rp 45.6M
            </Typography>
            <Typography variant="body2" color="green" sx={{ marginTop: 1 }}>
              +8.2% Since last month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Top Sellers</Typography>
            <Typography variant="h4" sx={{ marginTop: 1 }}>
              42
            </Typography>
            <Typography variant="body2" color="green" sx={{ marginTop: 1 }}>
              +3.7% Since last month
            </Typography>
          </Paper>
        </Grid>

        {/* Grafik Area */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Inventory Overview</Typography>
            <Line data={dataLine} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Category Distribution</Typography>
            <Pie data={dataPie} />
          </Paper>
        </Grid>

        {/* Produk Terbaru */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Recent Products</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Premium Cotton T-Shirt - 45 In Stock - Rp 149,000
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Slim Fit Jeans - 28 In Stock - Rp 299,000
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
