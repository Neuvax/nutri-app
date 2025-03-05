const foodDatabase = [
  // Frutas
  {
    id: 'f1',
    name: 'Manzana',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    category: 'Frutas',
  },
  {
    id: 'f2',
    name: 'Plátano',
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    category: 'Frutas',
  },
  {
    id: 'f3',
    name: 'Naranja',
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fat: 0.1,
    category: 'Frutas',
  },
  {
    id: 'f4',
    name: 'Fresa',
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    category: 'Frutas',
  },
  {
    id: 'f5',
    name: 'Piña',
    calories: 50,
    protein: 0.5,
    carbs: 13.1,
    fat: 0.1,
    category: 'Frutas',
  },

  // Verduras
  {
    id: 'v1',
    name: 'Lechuga',
    calories: 15,
    protein: 1.4,
    carbs: 2.9,
    fat: 0.2,
    category: 'Verduras',
  },
  {
    id: 'v2',
    name: 'Espinacas',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    category: 'Verduras',
  },
  {
    id: 'v3',
    name: 'Zanahoria',
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
    category: 'Verduras',
  },
  {
    id: 'v4',
    name: 'Tomate',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    category: 'Verduras',
  },
  {
    id: 'v5',
    name: 'Brócoli',
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    category: 'Verduras',
  },

  // Cereales
  {
    id: 'c1',
    name: 'Arroz blanco',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    category: 'Cereales',
  },
  {
    id: 'c2',
    name: 'Arroz integral',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    category: 'Cereales',
  },
  {
    id: 'c3',
    name: 'Pan integral',
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 3.4,
    category: 'Cereales',
  },
  {
    id: 'c4',
    name: 'Avena',
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    category: 'Cereales',
  },
  {
    id: 'c5',
    name: 'Quinoa',
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    category: 'Cereales',
  },

  // Legumbres
  {
    id: 'l1',
    name: 'Lentejas',
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    category: 'Legumbres',
  },
  {
    id: 'l2',
    name: 'Garbanzos',
    calories: 164,
    protein: 8.9,
    carbs: 27.4,
    fat: 2.6,
    category: 'Legumbres',
  },
  {
    id: 'l3',
    name: 'Frijoles negros',
    calories: 132,
    protein: 8.9,
    carbs: 23.7,
    fat: 0.5,
    category: 'Legumbres',
  },

  // Carnes y Pescados
  {
    id: 'cp1',
    name: 'Pollo (pechuga)',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: 'Carnes y Pescados',
  },
  {
    id: 'cp2',
    name: 'Ternera',
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 17,
    category: 'Carnes y Pescados',
  },
  {
    id: 'cp3',
    name: 'Salmón',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    category: 'Carnes y Pescados',
  },
  {
    id: 'cp4',
    name: 'Huevos',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    category: 'Carnes y Pescados',
  },

  // Lácteos
  {
    id: 'd1',
    name: 'Leche entera',
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    category: 'Lácteos',
  },
  {
    id: 'd2',
    name: 'Yogur natural',
    calories: 59,
    protein: 3.5,
    carbs: 4.7,
    fat: 3.3,
    category: 'Lácteos',
  },
  {
    id: 'd3',
    name: 'Queso fresco',
    calories: 98,
    protein: 14,
    carbs: 3.3,
    fat: 4.3,
    category: 'Lácteos',
  },

  // Frutos Secos y Semillas
  {
    id: 'ns1',
    name: 'Almendras',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    category: 'Frutos Secos y Semillas',
  },
  {
    id: 'ns2',
    name: 'Nueces',
    calories: 654,
    protein: 15,
    carbs: 14,
    fat: 65,
    category: 'Frutos Secos y Semillas',
  },
  {
    id: 'ns3',
    name: 'Semillas de chía',
    calories: 486,
    protein: 17,
    carbs: 42,
    fat: 31,
    category: 'Frutos Secos y Semillas',
  },

  // Aceites y Grasas
  {
    id: 'ag1',
    name: 'Aceite de oliva',
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    category: 'Aceites y Grasas',
  },
  {
    id: 'ag2',
    name: 'Aguacate',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    category: 'Aceites y Grasas',
  },

  // Otros
  {
    id: 'o1',
    name: 'Tofu',
    calories: 144,
    protein: 17,
    carbs: 3,
    fat: 8,
    category: 'Otros',
  },
  {
    id: 'o2',
    name: 'Tempeh',
    calories: 193,
    protein: 20,
    carbs: 9,
    fat: 11,
    category: 'Otros',
  },
];

export default foodDatabase;
