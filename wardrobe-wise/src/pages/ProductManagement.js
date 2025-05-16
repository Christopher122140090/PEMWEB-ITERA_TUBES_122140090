import React from 'react';
import { Box, Typography } from '@mui/material';

const ProductManagement = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Typography>
        Features to add, edit, and delete product details will be implemented here.
      </Typography>
    </Box>
  );
};

export default ProductManagement;
