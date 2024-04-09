import React, { useState, useEffect } from 'react';
//import productService from '../services/productService';
import ProductService from './ProductService';
import'./Grid.css'


import ProductForm from './ProductForm';
import './Modal.css';

const GridComponet = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // Track if we're adding a new product

  useEffect(() => {
    ProductService.getAllProducts()
      .then(response => setProducts(response))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleEdit = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setEditingProduct(productToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    ProductService.deleteProduct(id)
      .then(() => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setIsAdding(false); // Reset isAdding state
  };

  const handleAdd = () => {
    setIsAdding(true); // Set isAdding to true to indicate we're adding a new product
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={handleAdd}>Add Product</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (isAdding || editingProduct) && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <ProductForm
              product={editingProduct}
              onSubmit={(updatedProduct) => {
                const updatedProducts = isAdding
                  ? [...products, updatedProduct] // Add the new product
                  : products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)); // Update existing product
                setProducts(updatedProducts);
                handleCloseModal();
              }}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GridComponet;