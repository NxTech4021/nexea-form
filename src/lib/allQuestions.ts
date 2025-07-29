// src/lib/allQuestions.ts

// Import only the exported arrays (no UI code, no aliases)
import { questionsDataStep1  } from '../components/steps/step-1'
import { questionsDataStep10 } from '../components/steps/step-10'
import { questionsDataStep11 } from '../components/steps/step-11'
import { questionsDataStep12 } from '../components/steps/step-12'
import { questionsDataStep13 } from '../components/steps/step-13'
import { questionsDataStep14 } from '../components/steps/step-14'
import { questionsDataStep15 } from '../components/steps/step-15'
import { questionsDataStep16 } from '../components/steps/step-16'
import { questionsDataStep17 } from '../components/steps/step-17'
import { questionsDataStep18 } from '../components/steps/step-18'
import { questionsDataStep2  } from '../components/steps/step-2'
import { questionsDataStep3  } from '../components/steps/step-3'
import { questionsDataStep4  } from '../components/steps/step-4'
import { questionsDataStep5  } from '../components/steps/step-5'
import { questionsDataStep6  } from '../components/steps/step-6'
import { questionsDataStep7  } from '../components/steps/step-7'
import { questionsDataStep8  } from '../components/steps/step-8'
import { questionsDataStep9  } from '../components/steps/step-9'

// Concatenate them all into one array for seeding
export const allQuestions = [
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
]
