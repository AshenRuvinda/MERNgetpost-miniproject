import React, { useState } from 'react';
import axios from 'axios';

const CardUploader = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/cards', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Card uploaded successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      setMessage('Error uploading card: ' + error.message);
    }
  };

  return (
    <div className="uploader-container">
      <h1 className="uploader-title">Upload Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Image</label>
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