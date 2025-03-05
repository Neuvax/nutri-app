import React from 'react';

const ResumenNutricional = ({ selectedFoods }) => {
  const calculateTotals = () => {
    return selectedFoods.reduce((totals, item) => {
      const factor = item.quantity / 100; // Asumiendo que los valores nutricionales son por 100g/ml
      totals.calories += item.food.calories * factor;
      totals.protein += item.food.protein * factor;
      totals.carbs += item.food.carbs * factor;
      totals.fat += item.food.fat * factor;
      return totals;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const totals = calculateTotals();

  return (
    <div style={styles.container}>
      <h3>Resumen Nutricional</h3>
      <p>Calorías: {Math.round(totals.calories)} kcal</p>
      <p>Proteínas: {Math.round(totals.protein)}g</p>
      <p>Carbohidratos: {Math.round(totals.carbs)}g</p>
      <p>Grasas: {Math.round(totals.fat)}g</p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '20px',
  },
};

export default ResumenNutricional;
