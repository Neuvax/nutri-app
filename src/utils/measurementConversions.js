export const measurementConversions = {
    cucharada: 15,
    cucharadita: 5,
    taza: 240,
    palma: 75,
    puño: 60,
    chorrito: 10,
  };
  
  export const convertToGrams = (quantity, measure) => {
    return quantity * (measurementConversions[measure] || 1);
  };
  