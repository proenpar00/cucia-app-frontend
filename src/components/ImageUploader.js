import React from 'react';
import '../App.css'; // Asegúrate de importar el css

const ImageUploader = ({ onImageChange }) => {
  return (
    <div className="upload-container">
      <input
        type="file"
        id="file-upload"
        className="file-input"
        accept="image/*"
        onChange={onImageChange}
      />
      <label htmlFor="file-upload" className="custom-file-upload">
        Insertar una Imagen
      </label>
    </div>
  );
};

export default ImageUploader;
