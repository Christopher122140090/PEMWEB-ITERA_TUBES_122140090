import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Inventory', icon: <InventoryIcon /> },
  { text: 'Products', icon: <CategoryIcon /> },
  { text: 'Sales', icon: <ShoppingCartIcon /> },
  { text: 'Suppliers', icon: <LocalShippingIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
  { text: 'Logout', icon: <LogoutIcon /> },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: 'primary.main',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        WardrobeWise
      </Typography>
      <Divider sx={{ bgcolor: 'white', mb: 2 }} />
      <List>
        {menuItems.map(({ text, icon }) => (
          <ListItem button key={text} sx={{ mb: 1, borderRadius: 1, '&:hover': { bgcolor: 'primary.dark' } }}>
            <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
