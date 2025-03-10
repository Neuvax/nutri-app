import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DietPlanGenerator = ({ patientData }) => {
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const markdownStyles = {
    h1: { color: '#2c3e50', borderBottom: '1px solid #ecf0f1', paddingBottom: '10px' },
    h2: { color: '#34495e', marginTop: '20px' },
    h3: { color: '#7f8c8d' },
    p: { lineHeight: '1.6', color: '#2c3e50' },
    ul: { paddingLeft: '20px', color: '#2c3e50' },
    li: { marginBottom: '5px' },
    strong: { color: '#16a085' },
    table: { borderCollapse: 'collapse', width: '100%', marginBottom: '15px' },
    th: { backgroundColor: '#ecf0f1', padding: '10px', textAlign: 'left' },
    td: { padding: '10px', borderTop: '1px solid #ecf0f1' }
  };

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const prompt = `Eres un asistente especializado en nutrición que proporciona RECOMENDACIONES para que un nutriólogo profesional pueda crear un plan alimenticio adecuado. NO generes un plan alimenticio detallado, sino recomendaciones basadas en estos datos:
      
      Características del paciente:
      - Edad: ${patientData.age} años
      - Género: ${patientData.gender === 'male' ? 'Masculino' : 'Femenino'}
      - Altura: ${patientData.height} cm
      - Peso: ${patientData.weight} kg
      - Nivel de actividad: ${patientData.activityLevel}
      - Consideraciones adicionales: ${dietaryRestrictions}

      Proporciona:
      1. Estimación de requerimiento calórico diario aproximado
      2. Distribución recomendada de macronutrientes (proteínas, carbohidratos, grasas)
      3. Consideraciones especiales basadas en la edad y condición del paciente
      4. Recomendaciones generales sobre tipos de alimentos que podrían ser beneficiosos
      5. Alimentos que se deben limitar o evitar según la información proporcionada
      6. Sugerencias sobre frecuencia y tamaño de las comidas

      IMPORTANTE: Estas recomendaciones seran leidas por un nutriólogo profesional, por lo que no es necesario incluir detalles específicos sobre cantidades o recetas. Puedes usar tecnisismos.
      
      Formatea la respuesta usando Markdown para una mejor presentación, incluyendo encabezados, listas y énfasis donde sea apropiado.`;

      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          contents: [{
            parts: [{ text: prompt }]
          }]
        },
        {
          params: { key: process.env.REACT_APP_GEMINI_API_KEY },
          headers: { 'Content-Type': 'application/json' }
        }
      );

      setRecommendations(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error al generar recomendaciones nutricionales:', error);
      setRecommendations('Error al generar las recomendaciones. Por favor, intente de nuevo.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Recomendaciones Nutricionales</h2>
      <p style={{ color: '#555', marginBottom: '15px' }}>
        Esta herramienta genera recomendaciones generales para que un profesional de la nutrición pueda crear un plan alimenticio personalizado.
      </p>
      <textarea
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Ingrese consideraciones adicionales (ej. alergias, condiciones médicas, preferencias alimentarias)"
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
      <button 
        onClick={generateRecommendations} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isLoading ? 'Generando...' : 'Generar Recomendaciones'}
      </button>
      {recommendations && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recomendaciones Nutricionales:</h3>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            components={{
              h1: ({node, ...props}) => <h1 style={markdownStyles.h1} {...props} />,
              h2: ({node, ...props}) => <h2 style={markdownStyles.h2} {...props} />,
              h3: ({node, ...props}) => <h3 style={markdownStyles.h3} {...props} />,
              p: ({node, ...props}) => <p style={markdownStyles.p} {...props} />,
              ul: ({node, ...props}) => <ul style={markdownStyles.ul} {...props} />,
              li: ({node, ...props}) => <li style={markdownStyles.li} {...props} />,
              strong: ({node, ...props}) => <strong style={markdownStyles.strong} {...props} />,
              table: ({node, ...props}) => <table style={markdownStyles.table} {...props} />,
              th: ({node, ...props}) => <th style={markdownStyles.th} {...props} />,
              td: ({node, ...props}) => <td style={markdownStyles.td} {...props} />
            }}
          >
            {recommendations}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default DietPlanGenerator;
