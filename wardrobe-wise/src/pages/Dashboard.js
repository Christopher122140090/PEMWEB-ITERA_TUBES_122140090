// src/pages/Dashboard.js
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
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
        <Grid xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: '#F3F4F6',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6">Total Items</Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  1,254
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +12.5% Since last month
                </Typography>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: '#FEE2E2',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6">Low Stock</Typography>
                <Typography variant="h4" sx={{ mt: 1 }} color="error.main">
                  23
                </Typography>
                <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
                  -4.2% Since last week
                </Typography>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: '#F3F4F6',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6">Revenue</Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  Rp 45.6M
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +8.2% Since last month
                </Typography>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: '#F3F4F6',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6">Top Sellers</Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  42
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +3.7% Since last month
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: '#F3F4F6',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Inventory Overview
                </Typography>
                <Line data={dataLine} />
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: '#F3F4F6',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Category Distribution
                </Typography>
                <Pie data={dataPie} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={4}>
          <RecentProducts />
          <Box sx={{ mt: 3 }}>
            <LowStockAlert />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
