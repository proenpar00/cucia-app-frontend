import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import DiagnosisButton from './components/DiagnosisButton';
import DiagnosisResult from './components/DiagnosisResult';
import './App.css';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [diagnosisShown, setDiagnosisShown] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreviewUrl(url);
      setDiagnosisShown(false);
      setResult(null);
    }
  };

  const handleShowDiagnosis = async () => {
    setLoading(true);
    try {
      // La URL fija que mencionaste
      const response = await axios.get('https://cucia-service.onrender.com/api/v1/image/10');

      const base64Image = `data:image/jpeg;base64,${response.data.base64}`;
      setPreviewUrl(base64Image);
      setResult(response.data);
      setDiagnosisShown(true);
    } catch (error) {
      alert('Error al obtener el diagnóstico: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <NavBar />

      {!previewUrl && (
        <div className="intro-container">
          <div className="title-container">
            <h1 className="main-title">CUCIA</h1>
            <h4 className="subtitle">Cervix Uteri Cancer IA</h4>
          </div>

          <div className="centered-container">
            <ImageUploader onImageChange={handleImageChange} />
          </div>
        </div>
      )}

      {previewUrl && (
        <div className="content-container">
          <div className="left-panel">
            <ImagePreview previewUrl={previewUrl} />

            <div className="centered-container" style={{ marginTop: '1rem' }}>
              <DiagnosisButton
                modelLoaded={true}
                onClick={handleShowDiagnosis}
                loading={loading}
              />
              <ImageUploader onImageChange={handleImageChange} />
            </div>
          </div>

          <div className="right-panel">
            {diagnosisShown ? (
              <DiagnosisResult detections={result?.detections || []} />
            ) : (
              <p>No hay diagnóstico disponible.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
