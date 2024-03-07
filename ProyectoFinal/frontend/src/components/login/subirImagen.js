import React, { useState } from 'react';

function SubirImagen({ isOpen, onClose, onSubmit }) {
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(imageUrl);
    setImageUrl('');
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="imageUrl">Indica el URL de la imagen:</label>
              <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              <button type="submit">Subir</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SubirImagen;
