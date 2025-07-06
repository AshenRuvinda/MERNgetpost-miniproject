import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardSection = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cards');
        console.log('Fetched cards:', response.data); // Log fetched data
        setCards(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Fetch error:', error.message);
        setError('Error fetching cards: ' + (error.response?.data?.message || error.message));
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="viewer-container">
      <div className="header-section">
        <h1 className="viewer-title">Product Gallery</h1>
        <div className="title-underline"></div>
      </div>
      {error && (
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <p className="error-message">{error}</p>
        </div>
      )}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading products...</p>
        </div>
      ) : cards.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-box-open"></i>
          </div>
          <p className="no-cards-message">No products available</p>
        </div>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <div key={card._id} className="product-card">
              <div className="product-card-image-container">
                {card.imagePath ? (
                  <img
                    src={`http://localhost:5000/${card.imagePath}`}
                    alt={card.productName || 'Product'}
                    className="product-card-image"
                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                  />
                ) : (
                  <div className="product-card-image-placeholder">
                    <div className="placeholder-icon">
                      <i className="fas fa-image"></i>
                    </div>
                    <span>No Image</span>
                  </div>
                )}
                <div className="product-card-overlay">
                  <button className="product-card-button">
                    <span className="button-text">View Details</span>
                    <span className="button-icon">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </button>
                </div>
                <div className="product-card-gradient"></div>
              </div>
              <div className="product-card-content">
                <div className="product-header">
                  <h2 className="product-card-title">{card.productName || 'Unnamed Product'}</h2>
                  <div className="product-badge">NEW</div>
                </div>
                <p className="product-card-description">{card.productDescription || 'No description'}</p>
                <div className="product-footer">
                  <p className="product-card-price">
                    {typeof card.productPrice === 'number' ? `$${card.productPrice.toFixed(2)}` : 'Price not available'}
                  </p>
                  <div className="product-actions">
                    <button className="action-btn favorite-btn">
                      <i className="far fa-heart"></i>
                    </button>
                    <button className="action-btn cart-btn">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSection;