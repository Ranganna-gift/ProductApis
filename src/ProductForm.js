import React, { useState } from 'react';
//import productService from '../services/productService';
import ProductService from './ProductService';
//import './Modal.css'
import './Form.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const initialFormData = product || { name: '', description: '', price: '' };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (product) {
        await ProductService.editProduct(product.id, formData);
      } else {
        await ProductService.addProduct(formData);
      }
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div>
            <label>Price:</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;