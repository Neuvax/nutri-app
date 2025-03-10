import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SelectorComida from '../components/SelectorComida';
import VisualizadorDiario from '../components/VisualizadorDiario';
import platoImg from '../assets/plato_buen_comer.png';

const HomeScreen = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealType, setMealType] = useState('desayuno');
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    activityLevel: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const savedFoods = localStorage.getItem(`selectedFoods_${mealType}`);
    if (savedFoods) {
      setSelectedFoods(JSON.parse(savedFoods));
    }

    const savedPatientData = localStorage.getItem('patientData');
    if (savedPatientData) {
      setPatientData(JSON.parse(savedPatientData));
    }
  }, [mealType]);

  useEffect(() => {
    localStorage.setItem(`selectedFoods_${mealType}`, JSON.stringify(selectedFoods));
  }, [selectedFoods, mealType]);

  const addFood = (food, quantity) => {
    setSelectedFoods([...selectedFoods, { food, quantity }]);
  };

  const removeFood = (index) => {
    const newFoods = [...selectedFoods];
    newFoods.splice(index, 1);
    setSelectedFoods(newFoods);
  };

  const handlePatientDataChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const savePatientData = () => {
    localStorage.setItem('patientData', JSON.stringify(patientData));
    alert('Datos guardados correctamente');
    setShowModal(false);
  };

  const uploadDataToNutriologo = () => {
    const allMeals = {
      desayuno: JSON.parse(localStorage.getItem('selectedFoods_desayuno') || '[]'),
      almuerzo: JSON.parse(localStorage.getItem('selectedFoods_almuerzo') || '[]'),
      cena: JSON.parse(localStorage.getItem('selectedFoods_cena') || '[]')
    };
  
    const dataForNutriologo = {
      patientData: patientData,
      meals: allMeals,
      uploadDate: new Date().toISOString()
    };

    // Borrar los datos anteriores
    localStorage.removeItem('selectedFoods_desayuno');
    localStorage.removeItem('selectedFoods_almuerzo');
    localStorage.removeItem('selectedFoods_cena');

    // Guardar los nuevos datos
    localStorage.setItem('dataForNutriologo', JSON.stringify(dataForNutriologo));
  
    
    // Limpiar el estado de los alimentos seleccionados
    setSelectedFoods([]);
  
    // Actualizar el estado de mealType para reflejar que no hay comidas seleccionadas
    setMealType('');
  
    alert('Datos subidos correctamente para el nutriólogo y datos anteriores borrados');
  };
  

  const renderSelectedFoods = () => (
    <div style={styles.selectedFoodsContainer}>
      <h3>Alimentos Seleccionados</h3>
      {selectedFoods.map((food, index) => (
        <div key={index} style={styles.foodItem}>
          <span>{food.food.name} - {food.quantity} g</span>
          <button onClick={() => removeFood(index)} style={styles.removeButton}>X</button>
        </div>
      ))}
    </div>
  );

  const renderModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>Mis Datos</h2>
        <input
          name="name"
          placeholder="Nombre"
          value={patientData.name}
          onChange={handlePatientDataChange}
          style={styles.input}
        />
        <input
          name="age"
          type="number"
          placeholder="Edad"
          value={patientData.age}
          onChange={handlePatientDataChange}
          style={styles.input}
        />
        <input
          name="height"
          type="number"
          placeholder="Altura (cm)"
          value={patientData.height}
          onChange={handlePatientDataChange}
          style={styles.input}
        />
        <input
          name="weight"
          type="number"
          placeholder="Peso (kg)"
          value={patientData.weight}
          onChange={handlePatientDataChange}
          style={styles.input}
        />
        <select
          name="gender"
          value={patientData.gender}
          onChange={handlePatientDataChange}
          style={styles.select}
        >
          <option value="">Seleccione género</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
        <select
          name="activityLevel"
          value={patientData.activityLevel}
          onChange={handlePatientDataChange}
          style={styles.select}
        >
          <option value="">Nivel de actividad</option>
          <option value="sedentary">Sedentario</option>
          <option value="light">Ligero</option>
          <option value="moderate">Moderado</option>
          <option value="active">Activo</option>
          <option value="veryActive">Muy activo</option>
        </select>
        <button onClick={savePatientData} style={styles.button}>Guardar Datos</button>
        <button onClick={() => setShowModal(false)} style={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );

  const renderHelpModal = () => (
    <div style={styles.modalOverlay}>
      <div style={{...styles.modal, maxWidth: '600px'}}>
        <h2 style={styles.modalTitle}>¿Cómo funciona esta aplicación?</h2>
        
        <div style={styles.helpContent}>
          <h3>Para pacientes:</h3>
          <ol style={styles.helpList}>
            <li>Completa tus datos personales haciendo clic en "Editar Mis Datos"</li>
            <li>Para registrar tu alimentación:
              <ul>
                <li>Selecciona una categoría de alimento</li>
                <li>Elige el alimento específico</li>
                <li>Indica la cantidad</li>
                <li>Haz clic en "Agregar"</li>
              </ul>
            </li>
            <li>Puedes ver el resumen nutricional en tiempo real</li>
            <li>Al finalizar el día, haz clic en "Subir Datos para el Nutriólogo" para que tu profesional pueda revisar tu alimentación</li>
          </ol>

          <h3>Importante:</h3>
          <p>Al subir los datos para el nutriólogo, el registro diario se reiniciará automáticamente.</p>
        </div>
        
        <button onClick={() => setShowHelpModal(false)} style={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Encabezado con título y botón de ayuda */}
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>App de Nutrición</h1>
        <button 
          onClick={() => setShowHelpModal(true)} 
          style={styles.helpButton}
        >
          ?
        </button>
      </div>
      <div style={styles.logoContainer}>
        <img 
          src={platoImg}
          alt="Plato del buen comer" 
          style={styles.platoImg} 
        />
      </div>

      <div style={styles.topButtons}>
        <button onClick={() => setShowModal(true)} style={{ ...styles.button, marginRight: '10px' }}>
          Editar Mis Datos
        </button>
        <button onClick={uploadDataToNutriologo} style={{ ...styles.uploadButton }}>
          Subir Datos para el Nutriólogo
        </button>
      </div>

      {/* Modales */}
      {showModal && renderModal()}
      {showHelpModal && renderHelpModal()}

      {/* Selector de comida */}
      <SelectorComida onAddFood={addFood} />

      {/* Tabla de alimentos seleccionados */}
      {renderSelectedFoods()}

      {/* Visualizador diario */}
      <VisualizadorDiario selectedFoods={selectedFoods} />

      {/* Enlace al nutriólogo */}
      <Link to="/nutriologo" style={styles.link}>Ir a sección de Nutriólogo</Link>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
    marginBottom: '20px',
  },
  topButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  selectedFoodsContainer: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  foodItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0',
    borderBottom: '1px solid #eee',
  },
  section: {  
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'center',
    padding: '10px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    margin: '8px 0',
    fontSize: '16px',
    borderRadius: '25px',
    border: '1px solid #bdc3c7',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    margin: '8px 0',
    borderRadius: '25px',
    border: '1px solid #bdc3c7',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
    appearance: 'none',
    backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px top 50%',
    backgroundSize: '20px auto',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  uploadButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '20px',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  closeButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  helpButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  modalTitle: {
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
    marginBottom: '20px',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
  },
  helpContent: {
    fontFamily: "'Roboto', sans-serif",
    textAlign: 'left',
    marginBottom: '20px',
  },
  helpList: {
    margin: '10px 0',
    paddingLeft: '20px',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
    width: '100%',
  },
  platoImg: {
    maxWidth: '350px',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
};

export default HomeScreen;
