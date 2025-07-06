import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardSection = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cards');
        setCards(response.data);
      } catch (error) {
        setError('Error fetching cards: ' + error.message);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="viewer-container">
      <h1 className="viewer-title">Card Gallery</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="card-grid">
        {cards.map((card) => (
          <div key={card._id} className="card">
            <img
              src={`http://localhost:5000/${card.imagePath}`}
              alt={card.title}
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;