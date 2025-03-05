import React from 'react';

const VisualizadorDiario = ({ selectedFoods }) => {
  return (
    <div style={styles.container}>
      <h2>Comidas del día</h2>
      {selectedFoods.map((item, index) => (
        <div key={index} style={styles.item}>
          <span>{item.food.name}</span>
          <span>{item.displayQuantity} {item.displayMeasure} ({Math.round(item.quantity)}g)</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '300px',
    margin: '20px auto',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    borderBottom: '1px solid #eee',
  },
};

export default VisualizadorDiario;
