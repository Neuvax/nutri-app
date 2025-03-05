import React, { useState, useEffect } from 'react';
import DietPlanGenerator from '../components/DietPlanGenerator';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import calculateNutrients from '../utils/calculateNutrients';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NutriologoScreen = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [nutritionSummary, setNutritionSummary] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [bmr, setBMR] = useState(null);
  const [dailyCalories, setDailyCalories] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPatientData();
    }
  }, [isAuthenticated]);

  const fetchPatientData = () => {
    const storedData = JSON.parse(localStorage.getItem('dataForNutriologo')) || {};
    setPatientData(storedData.patientData || {});

    const allMeals = [
      ...(storedData.meals?.desayuno || []),
      ...(storedData.meals?.almuerzo || []),
      ...(storedData.meals?.cena || [])
    ];

    const nutrients = calculateNutrients(allMeals);
    setNutritionSummary(nutrients);

    if (storedData.patientData) {
      calculateBMI(storedData.patientData);
      calculateBMR(storedData.patientData);
    }
  };

  const calculateBMI = (data) => {
    if (data.height && data.weight) {
      const heightInMeters = data.height / 100;
      const calculatedBMI = data.weight / (heightInMeters * heightInMeters);
      setBMI(calculatedBMI.toFixed(2));
    }
  };

  const calculateBMR = (data) => {
    if (data.weight && data.height && data.age && data.gender) {
      let calculatedBMR;
      if (data.gender === 'male') {
        calculatedBMR = 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age);
      } else {
        calculatedBMR = 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age);
      }
      setBMR(calculatedBMR.toFixed(2));
      calculateDailyCalories(calculatedBMR, data.activityLevel);
    }
  };

  const calculateDailyCalories = (bmr, activityLevel) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    const calories = bmr * activityMultipliers[activityLevel];
    setDailyCalories(calories.toFixed(2));
  };

  const handleLogin = () => {
    if (password === 'nutri123') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const resetNutriologoData = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todos los datos del nutriólogo?')) {
      // Eliminar datos del localStorage
      localStorage.removeItem('dataForNutriologo');
      
      // Resetear estados
      setPatientData(null);
      setNutritionSummary(null);
      setBMI(null);
      setBMR(null);
      setDailyCalories(null);
      
      // Mostrar confirmación
      alert('Los datos han sido eliminados correctamente.');
    }
  };

  const resetNutritionData = () => {
    if (window.confirm('¿Estás seguro de que deseas resetear los datos nutricionales?')) {
      // Obtener datos actuales
      const storedData = JSON.parse(localStorage.getItem('dataForNutriologo')) || {};
      
      // Mantener los datos del paciente pero resetear las comidas
      const updatedData = {
        ...storedData,
        meals: {
          desayuno: [],
          almuerzo: [],
          cena: []
        }
      };
      
      // Guardar los datos actualizados
      localStorage.setItem('dataForNutriologo', JSON.stringify(updatedData));
      
      // Actualizar el estado
      setNutritionSummary({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      });
      
      // Mostrar confirmación
      alert('Datos nutricionales reseteados correctamente.');
    }
  };

  const renderPatientForm = () => {
    if (!patientData) {
      return <p>Cargando datos del paciente...</p>;
    }
    return (
      <div style={styles.patientFormContainer}>
        <h3 style={styles.title}>Datos del Paciente</h3>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nombre:</label>
            <input type="text" value={patientData.name || ''} readOnly style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Edad:</label>
            <input type="number" value={patientData.age || ''} readOnly style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Altura (cm):</label>
            <input type="number" value={patientData.height || ''} readOnly style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Peso (kg):</label>
            <input type="number" value={patientData.weight || ''} readOnly style={styles.input} />
          </div>
        </form>
      </div>
    );
  };

  const renderNutritionSummary = () => {
    if (!nutritionSummary) {
      return <p>Calculando resumen nutricional...</p>;
    }
    return (
      <div style={styles.nutritionSummaryContainer}>
        <h3 style={styles.title}>Resumen Nutricional Diario</h3>
        <div>
          <p>Calorías: {nutritionSummary.calories} kcal</p>
          <p>Proteínas: {nutritionSummary.protein} g</p>
          <p>Carbohidratos: {nutritionSummary.carbs} g</p>
          <p>Grasas: {nutritionSummary.fat} g</p>
        </div>
        <button 
          style={styles.resetButton} 
          onClick={resetNutritionData}
        >
          Resetear datos nutricionales
        </button>
      </div>
    );
  };
  

  const renderCalculations = () => {
    return (
      <div style={styles.calculationsContainer}>
        <h3 style={styles.title}>Cálculos</h3>
        <p>IMC: {bmi || 'No calculado'}</p>
        <p>Metabolismo Basal: {bmr || 'No calculado'} kcal/día</p>
        <p>Calorías Diarias Recomendadas: {dailyCalories || 'No calculado'} kcal</p>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <h2 style={styles.loginTitle}>Acceso Nutriólogo</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          style={styles.loginInput}
        />
        <button style={styles.loginButton} onClick={handleLogin}>Acceder</button>
      </div>
    );
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.mainTitle}>Panel del Nutriólogo</h2>
        <button 
          style={{...styles.resetButton, ...styles.adminButton}} 
          onClick={resetNutriologoData}
        >
          Eliminar todos los datos
        </button>
      </div>
      {renderPatientForm()}
      {renderNutritionSummary()}
      {renderCalculations()}
      <DietPlanGenerator patientData={patientData} />
    </div>
  );
};

const styles = {
  mainContainer: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
  },
  mainTitle: {
    color: '#0066cc',
    fontSize: '24px',
    marginBottom: '20px',
  },
  patientFormContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '10px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
    height: '300px',
  },
  reminderContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  reminderText: {
    fontSize: '16px',
    color: '#666',
  },
  adherenceContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  adherenceText: {
    fontSize: '16px',
    color: '#666',
  },
  nutritionSummaryContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  planGeneratorContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  planButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loginContainer: {
    maxWidth: '300px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
  },
  loginTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  },
  loginInput: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px',
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  calculationsContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  mealListContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  mealItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  dietPlanContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  adminButton: {
    backgroundColor: '#d9534f',
    padding: '8px 16px',
    fontSize: '14px',
  },
};

export default NutriologoScreen;
