import React from 'react';

const ImagePreview = ({ previewUrl }) => {
  return previewUrl ? (
    <img src={previewUrl} alt="Preview" className="image-preview" />
  ) : (
    <div className="title-container">
      <h4 className="subtitle">Cervix Uteri Cancer IA</h4>
    </div>
  );
};

export default ImagePreview;
