import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DietPlanGenerator = ({ patientData }) => {
  const [dietPlan, setDietPlan] = useState('');
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

  const generateDietPlan = async () => {
    setIsLoading(true);
    try {
      const prompt = `No preguntes si tengo mas preguntas. Se firme con tus propuestas. Eres un nutriologo. Estas en consulta con un paciente y tienes que brindarle un plan de alimentacion en base a sus metas y necesidades. 
      Crea un plan de alimentación personalizado para un paciente con las siguientes características:
        - Edad: ${patientData.age} años
        - Género: ${patientData.gender}
        - Altura: ${patientData.height} cm
        - Peso: ${patientData.weight} kg
        - Nivel de actividad: ${patientData.activityLevel}
        - Metas y restricciones alimenticias: ${dietaryRestrictions}

        El plan debe incluir:
        1. Desayuno
        2. Merienda de media mañana
        3. Almuerzo
        4. Merienda de media tarde
        5. Cena

        Para cada comida, proporciona:
        - Nombre del plato
        - Ingredientes con cantidades específicas
        - Calorías aproximadas

        Asegúrate de que el plan sea equilibrado nutricionalmente, se ajuste a las necesidades calóricas del paciente y respete las metas y restricciones alimenticias especificadas. Incluye una variedad de alimentos de todos los grupos alimenticios permitidos.

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

      setDietPlan(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error al generar el plan de alimentación:', error);
      setDietPlan('Error al generar el plan de alimentación. Por favor, intente de nuevo.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Generador de Plan de Alimentación</h2>
      <textarea
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Ingrese metas y restricciones alimenticias (ej. vegetariano, alergia a nueces, objetivo de pérdida de peso)"
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
        onClick={generateDietPlan} 
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
        {isLoading ? 'Generando...' : 'Generar Plan de Alimentación'}
      </button>
      {dietPlan && (
        <div style={{ marginTop: '20px' }}>
          <h3>Plan de Alimentación Personalizado:</h3>
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
            {dietPlan}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default DietPlanGenerator;
