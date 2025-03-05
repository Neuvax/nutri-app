import React, { useState } from 'react';
import foodDatabase from '../utils/foodDatabase';
import { measurementConversions, convertToGrams } from '../utils/measurementConversions';

const SelectorComida = ({ onAddFood }) => {
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measure, setMeasure] = useState('g');
  const [category, setCategory] = useState('');

  const handleAddFood = () => {
    if (selectedFood && quantity) {
      const food = foodDatabase.find(f => f.id === selectedFood);
      const grams = convertToGrams(parseFloat(quantity), measure);
      onAddFood(food, grams, measure, parseFloat(quantity));
      setSelectedFood('');
      setQuantity('');
      setMeasure('g');
    }
  };

  const categories = [...new Set(foodDatabase.map(food => food.category))];
  const filteredFoods = category
    ? foodDatabase.filter(food => food.category === category)
    : foodDatabase;

  return (
    <div style={styles.container}>
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        style={styles.select}
      >
        <option value="">Todas las categorías</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select 
        value={selectedFood} 
        onChange={(e) => setSelectedFood(e.target.value)}
        style={styles.select}
      >
        <option value="">Selecciona un alimento</option>
        {filteredFoods.map(food => (
          <option key={food.id} value={food.id}>{food.name}</option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Cantidad"
        style={styles.input}
      />
      <select
        value={measure}
        onChange={(e) => setMeasure(e.target.value)}
        style={styles.select}
      >
        <option value="g">gr</option>
        {Object.keys(measurementConversions).map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button onClick={handleAddFood} style={styles.button}>Agregar</button>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '300px',
    margin: '20px auto',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',  
    border: '1px solid #ccc',  
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px', 
    border: '1px solid #ccc',  
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',  
  },
};

export default SelectorComida;
