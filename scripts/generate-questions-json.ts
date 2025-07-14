#!/usr/bin/env node
// scripts/generate-questions-json.cjs

// 1) let ts-node compile your TS/TSX on the fly
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    moduleResolution: 'node',
    jsx: 'react-jsx', // erase JSX, keep your exports
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  },
});

// 2) let tsconfig-paths resolve your `@/*` imports
const tsConfigPaths = require('tsconfig-paths');
const { resolve } = require('path');
const baseUrl = resolve(__dirname, '../');
tsConfigPaths.register({
  baseUrl,
  paths: {
    '@/*': [`${baseUrl}/src/*`],
  },
});

const fs = require('fs');
const path = require('path');

// 3) require each of your step exports (ts-node + tsconfig-paths will handle TSX + aliases)
const { questionsDataStep1 } = require('../src/components/steps/step-1');
const { questionsDataStep2 } = require('../src/components/steps/step-2');
const { questionsDataStep3 } = require('../src/components/steps/step-3');
const { questionsDataStep4 } = require('../src/components/steps/step-4');
const { questionsDataStep5 } = require('../src/components/steps/step-5');
const { questionsDataStep6 } = require('../src/components/steps/step-6');
const { questionsDataStep7 } = require('../src/components/steps/step-7');
const { questionsDataStep8 } = require('../src/components/steps/step-8');
const { questionsDataStep9 } = require('../src/components/steps/step-9');
const { questionsDataStep10 } = require('../src/components/steps/step-10');
const { questionsDataStep11 } = require('../src/components/steps/step-11');
const { questionsDataStep12 } = require('../src/components/steps/step-12');
const { questionsDataStep13 } = require('../src/components/steps/step-13');
const { questionsDataStep14 } = require('../src/components/steps/step-14');
const { questionsDataStep15 } = require('../src/components/steps/step-15');
const { questionsDataStep16 } = require('../src/components/steps/step-16');
const { questionsDataStep17 } = require('../src/components/steps/step-17');
const { questionsDataStep18 } = require('../src/components/steps/step-18');

// 4) flatten into one big array
const allQuestions = [
  ...questionsDataStep1,
  ...questionsDataStep2,
  ...questionsDataStep3,
  ...questionsDataStep4,
  ...questionsDataStep5,
  ...questionsDataStep6,
  ...questionsDataStep7,
  ...questionsDataStep8,
  ...questionsDataStep9,
  ...questionsDataStep10,
  ...questionsDataStep11,
  ...questionsDataStep12,
  ...questionsDataStep13,
  ...questionsDataStep14,
  ...questionsDataStep15,
  ...questionsDataStep16,
  ...questionsDataStep17,
  ...questionsDataStep18,
].map(q => ({
  ...q,
  type: q.type.toUpperCase() // Convert type to uppercase
}));

// 5) write it out to prisma/questions.json
const outPath = path.resolve(__dirname, '../prisma/questions.json');
fs.writeFileSync(outPath, JSON.stringify(allQuestions, null, 2));
console.log(`✅ Wrote ${allQuestions.length} questions to ${outPath}`);
