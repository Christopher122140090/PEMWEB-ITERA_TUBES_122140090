import React from 'react';
import FormProduk from '../components/FormProduk';

const AddProduct = () => {
  const handleSubmit = (newProduct) => {
    console.log('Produk baru:', newProduct);
  };

  return (
    <div>
      <h2>Tambah Produk Baru</h2>
      <FormProduk onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;
