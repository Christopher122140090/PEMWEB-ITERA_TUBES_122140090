import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProductManagement from './pages/ProductManagement';
import SalesReports from './pages/SalesReports';
import StockMonitoring from './pages/StockMonitoring';
import BarcodeScanner from './pages/BarcodeScanner';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/sales-reports" element={<SalesReports />} />
          <Route path="/stock-monitoring" element={<StockMonitoring />} />
          <Route path="/barcode-scanner" element={<BarcodeScanner />} />
          <Route path="*" element={<Navigate to="/product-management" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
