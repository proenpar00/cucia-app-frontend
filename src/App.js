import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import ModelSelector from './components/ModelSelector';
import DiagnosisButton from './components/DiagnosisButton';
import DiagnosisResult from './components/DiagnosisResult';
import './App.css';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);

  const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    console.log("URL de previsualización generada:", url);
    setSelectedImage(file);
    setPreviewUrl(url);
  }
};

  const handleLoadModel = async () => {
    if (!selectedImage) {
      alert('Por favor, sube una imagen primero');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('model', model);

    try {
      const response = await axios.post(`https://cucia-service.onrender.com/api/v1/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.id) {
        setImageId(response.data.id);
        setModelLoaded(true);
      }
    } catch (error) {
      alert('Error al cargar el modelo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDiagnosis = async () => {
    if (!imageId) {
      alert('No hay diagnóstico disponible.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://cucia-service.onrender.com/api/v1/image/${imageId}`);
      setPreviewUrl(`data:image/jpeg;base64,${response.data.base64}`);
      setResult(response.data);
    } catch (error) {
      alert('Error al obtener el diagnóstico: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

 const renderInitialView = () => (
  <div className="intro-container">
    {!previewUrl && (
      <div className="title-container">
        <h1 className="main-title">CUCIA</h1>
        <h4 className="subtitle">Cervix Uteri Cancer IA</h4>
      </div>
    )}

    {previewUrl && <ImagePreview previewUrl={previewUrl} />}

    <div className="centered-container">
      <ImageUploader onImageChange={handleImageChange} />
      <ModelSelector onSelect={setModel} />
      <DiagnosisButton
        modelLoaded={modelLoaded}
        onClick={modelLoaded ? handleShowDiagnosis : handleLoadModel}
        loading={loading}
      />
    </div>
  </div>
);




  const renderDiagnosisView = () => (
  <div className="content-container">
    <div className="left-panel">
      <ImagePreview previewUrl={previewUrl} />
      <ImageUploader onImageChange={handleImageChange} />
      <DiagnosisButton 
        modelLoaded={modelLoaded} 
        onClick={modelLoaded ? handleShowDiagnosis : handleLoadModel} 
        loading={loading} 
      />
    </div>
    <div className="right-panel">
      {/* Aquí pasamos solo el array detections */}
      <DiagnosisResult detections={result?.detections || []} />
    </div>
  </div>
);

  return (
    <div className="app-container">
      <NavBar />
      {result ? renderDiagnosisView() : renderInitialView()}
    </div>
  );
};

export default App;
