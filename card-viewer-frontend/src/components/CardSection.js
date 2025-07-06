import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardSection = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cards');
        console.log('Fetched cards:', response.data); // Log fetched data
        setCards(Array.isArray(response.data) ? response.data : []); // Ensure cards is an array
      } catch (error) {
        console.error('Fetch error:', error.message);
        setError('Error fetching cards: ' + (error.response?.data?.message || error.message));
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="viewer-container">
      <h1 className="viewer-title">Product Gallery</h1>
      {error && <p className="error-message">{error}</p>}
      {cards.length === 0 && !error ? (
        <p className="no-cards-message">No products available</p>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <div key={card._id} className="card">
              {card.imagePath ? (
                <img
                  src={`http://localhost:5000/${card.imagePath}`}
                  alt={card.productName || 'Product'}
                  className="card-image"
                  onError={(e) => (e.target.src = '/placeholder.jpg')} // Fallback image
                />
              ) : (
                <div className="card-image-placeholder">No Image</div>
              )}
              <div className="card-content">
                <h2 className="card-title">{card.productName || 'Unnamed Product'}</h2>
                <p className="card-description">{card.productDescription || 'No description'}</p>
                <p className="card-price">
                  ${typeof card.productPrice === 'number' ? card.productPrice.toFixed(2) : 'Price not available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSection;