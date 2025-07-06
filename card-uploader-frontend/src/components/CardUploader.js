import React, { useState } from 'react';
import axios from 'axios';

const CardUploader = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !productDescription || !productPrice || !image) {
      setMessage('Please fill in all fields and select an image');
      return;
    }
    const price = parseFloat(productPrice);
    if (isNaN(price) || price <= 0) {
      setMessage('Please enter a valid positive price');
      return;
    }
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', price);
    formData.append('image', image);
    console.log('Sending data:', { productName, productDescription, productPrice: price, image }); // Log data
    try {
      const response = await axios.post('http://localhost:5000/api/cards', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Product uploaded successfully!');
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setImage(null);
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      setMessage('Error uploading product: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="uploader-container">
      <h1 className="uploader-title">Upload Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="form-textarea"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Product Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Upload
        </button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default CardUploader;