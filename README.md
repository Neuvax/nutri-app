# App de Nutrición

Aplicación web para el seguimiento y planificación de comidas saludables. Esta aplicación permite a los usuarios seleccionar alimentos, visualizar su contenido nutricional y generar planes de alimentación personalizados utilizando la API de Gemini AI.

## Características

- **Selección de Alimentos**: Los usuarios pueden seleccionar comidas de una base de datos amplia y variada.
- **Visualización Nutricional**: Se muestra un resumen de los macronutrientes (calorías, proteínas, carbohidratos y grasas) para cada comida seleccionada.
- **Generación de Planes de Alimentación**: Utiliza la API de Gemini AI para crear planes de alimentación personalizados basados en las necesidades del usuario.
- **Análisis de Imágenes**: Capacidad de analizar imágenes de alimentos para obtener información nutricional detallada.
- **Recomendaciones Personalizadas**: Ofrece sugerencias de mejora dietética basadas en el perfil del usuario y sus objetivos.

## Tecnologías Utilizadas

- **Frontend**: React.js
- **Backend**: Node.js
- **API de IA**: Gemini AI (Google)
- **Bibliotecas**: `react-markdown`, `axios`, `chart.js`

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade tu clave API de Gemini:
   ```
   REACT_APP_GEMINI_API_KEY=tu_clave_api_aquí
   ```

4. Inicia la aplicación:
   ```
   npm start
   ```

## Uso

1. Registra tus datos personales y objetivos nutricionales.
2. Selecciona alimentos de la base de datos o sube imágenes de tus comidas.
3. Visualiza el análisis nutricional detallado.
4. Genera planes de alimentación personalizados con la ayuda de Gemini AI.
5. Recibe recomendaciones para mejorar tu dieta.

## Contribuciones

Estamos abiertos a contribuciones. Si tienes ideas o mejoras para la aplicación, no dudes en abrir un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

