// src/pages/Dashboard.js
import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import RecentProducts from '../components/RecentProducts';
import LowStockAlert from '../components/LowStockAlert';

const Dashboard = () => {
  // Data for Inventory Overview chart
  const dataLine = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Inventory Overview',
        data: [1200, 1300, 1250, 1400, 1500, 1600, 1550, 1450, 1650, 1700, 1600, 1500],
        borderColor: '#6A5CFF',
        backgroundColor: 'rgba(106, 92, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Data for Category Distribution chart
  const dataPie = {
    labels: ['T-Shirts', 'Jeans', 'Shirts', 'Dresses', 'Jackets'],
    datasets: [
      {
        data: [400, 250, 150, 100, 50],
        backgroundColor: ['#6A5CFF', '#3B82F6', '#10B981', '#FBBF24', '#EF4444'],
        hoverOffset: 30,
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
              150
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Stock</Typography>
            <Typography variant="h4" color="secondary" sx={{ mt: 1 }}>
              1254
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Low Stock Items</Typography>
            <Typography variant="h4" color="error" sx={{ mt: 1 }}>
              23
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Sales (Month)</Typography>
            <Typography variant="h4" color="success" sx={{ mt: 1 }}>
              Rp 45.6M
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Overview
            </Typography>
            {/* Chart will be implemented here */}
            <Line data={dataLine} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Category Distribution
            </Typography>
            {/* Chart will be implemented here */}
            <Pie data={dataPie} />
          </Paper>
        </Grid>

        {/* Recent Products and Low Stock Alerts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Products
            </Typography>
            {/* Recent Products component will be here */}
            <RecentProducts />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Low Stock Alerts
            </Typography>
            {/* Low Stock Alert component will be here */}
            <LowStockAlert />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
