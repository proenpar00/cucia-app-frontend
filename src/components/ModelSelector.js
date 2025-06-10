import React from 'react';
import '../App.css'; // Importa el css

function ModelSelector({ onSelect }) {
  const models = ['YOLOv5', 'YOLOv8', 'YOLOv12'];

  return (
    <select onChange={e => onSelect(e.target.value)} defaultValue="">
      <option value="" disabled>
        Selecciona un modelo
      </option>
      {models.map(model => (
        <option key={model} value={model}>
          {model}
        </option>
      ))}
    </select>
  );
}

export default ModelSelector;
