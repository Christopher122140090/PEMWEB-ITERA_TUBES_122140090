import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InventoryIcon from '@material-ui/icons/Storefront';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 260,
    height: '100vh',
    backgroundColor: '#6A5CFF',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  divider: {
    backgroundColor: 'white',
    marginBottom: theme.spacing(3),
  },
  listItem: {
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    color: 'rgba(255, 255, 255, 0.8)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  listItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
  },
  listItemIcon: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  listItemIconActive: {
    color: 'white',
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Product Management', icon: <CategoryIcon />, path: '/product-management' },
  { text: 'Sales Reports', icon: <ShoppingCartIcon />, path: '/sales-reports' },
  { text: 'Stock Monitoring', icon: <InventoryIcon />, path: '/stock-monitoring' },
];

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        WardrobeWise
      </Typography>
      <Divider className={classes.divider} />
      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem
              button
              key={text}
              component={Link}
              to={path}
              className={`${classes.listItem} ${isActive ? classes.listItemActive : ''}`}
            >
              <ListItemIcon className={isActive ? classes.listItemIconActive : classes.listItemIcon}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
