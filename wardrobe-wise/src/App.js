import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Sidebar from './components/Sidebar';
import ProductManagement from './pages/ProductManagement';
import SalesReports from './pages/SalesReports';
import StockMonitoring from './pages/StockMonitoring';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <Box style={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" style={{ flexGrow: 1, padding: 24 }}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/product-management" component={ProductManagement} />
          <Route path="/sales-reports" component={SalesReports} />
          <Route path="/stock-monitoring" component={StockMonitoring} />
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </Box>
    </Box>
  );
}

export default App;
