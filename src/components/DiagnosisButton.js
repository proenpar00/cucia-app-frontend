import React from 'react';
import '../App.css'; // Importa el css

const DiagnosisButton = ({ modelLoaded, onClick, loading }) => {
  return (
    <button
      className="button-style"
      onClick={onClick}
      disabled={loading || (!modelLoaded && loading)}
    >
      {loading ? 'Cargando...' : modelLoaded ? 'Mostrar Diagnóstico' : 'Cargar Modelo'}
    </button>
  );
};

export default DiagnosisButton;
