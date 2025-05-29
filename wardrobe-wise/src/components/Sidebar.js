import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Product Management', icon: <CategoryIcon />, path: '/product-management' },
  { text: 'Sales Reports', icon: <ShoppingCartIcon />, path: '/sales-reports' },
  { text: 'Stock Monitoring', icon: <InventoryIcon />, path: '/stock-monitoring' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        bgcolor: '#6A5CFF',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold', letterSpacing: 1.2 }}>
        WardrobeWise
      </Typography>
      <Divider sx={{ bgcolor: 'white', mb: 3 }} />
      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem
              button
              key={text}
              component={Link}
              to={path}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                bgcolor: isActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  bgcolor: isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
