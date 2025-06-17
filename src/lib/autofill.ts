// Autofills the form for testing, button is in assessment.tsx file
import { FormData } from '@/contexts/form-context';

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function generateMatrixData(rows: number, cols: number) {
  const columns = Array.from({ length: cols }, (_, i) => `col_${i}`);
  const shuffledColumns = shuffle([...columns]);
  const matrixData: { [key: string]: string } = {};
  for (let i = 0; i < rows; i++) {
    matrixData[`row_${i}`] = shuffledColumns[i];
  }
  return matrixData;
}

export function getAutofillData(): Partial<FormData> {
  const matrixKeys = Array.from({ length: 36 }, (_, i) => `matrix${i + 1}`);
  const radioKeys = Array.from({ length: 117 }, (_, i) => `radio${i + 1}`);

  const radioOptions = [
    'Strongly Agree',
    'Agree',
    'Neutral',
    'Disagree',
    'Strongly Disagree',
  ];

  const autofill: Partial<FormData> = {
    company: 'NEXEA',
    email: 'employee@nexea.co',
    fullName: 'Employee Name',
    matrixes: [],
    phoneNumber: '01234567890',
    radios: [],
  };

  autofill.matrixes = matrixKeys.map((key) => ({
    [key]: generateMatrixData(4, 4),
  }));

  autofill.radios = radioKeys.map((key) => ({
    [key]: radioOptions[Math.floor(Math.random() * radioOptions.length)],
  }));

  return autofill;
} 