const calculateNutrients = (selectedFoods) => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  selectedFoods.forEach(item => {
    const factor = item.quantity / 100; // Asumiendo que los valores nutricionales son por 100g/ml
    totalCalories += item.food.calories * factor;
    totalProtein += item.food.protein * factor;
    totalCarbs += item.food.carbs * factor;
    totalFat += item.food.fat * factor;
  });

  return {
    calories: Math.round(totalCalories),
    protein: Math.round(totalProtein * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    fat: Math.round(totalFat * 10) / 10,
  };
};

export default calculateNutrients;
