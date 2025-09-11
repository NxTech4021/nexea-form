// src/contexts/form-context.tsx
'use client';

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

// ——— 2) Context type ———
export interface FormContextType {
  completedSteps: Set<number>;
  createQuestion: (question: Omit<QuestionDefinition, 'id'>) => Promise<void>;
  currentStep: number;
  deleteQuestion: (id: string) => Promise<void>;
  error: null | string;
  // survey flow
  formData: FormData;
  isLoading: boolean;
  isStepCompleted: (step: number) => boolean;
  markStepCompleted: (step: number) => void;

  // admin UI
  questions: QuestionDefinition[];
  resetForm: () => void;
  setCurrentStep: (step: number) => void;
  setQuestions: Dispatch<SetStateAction<QuestionDefinition[]>>;
  totalSteps: number;
  updateEmail: (email: string) => void;
  updateFormData: (data: Partial<FormData>) => void;
  updateQuestion: (question: QuestionDefinition) => Promise<void>;

  // database saving
  respondentId: string | null;
  responseId: number | null;
  saveRespondent: (data: { fullName: string; email: string; phoneNumber: string; company: string }) => Promise<void>;
  saveStepResponse: (step: number, answers: Record<string, any>) => Promise<void>;
  loadSavedResponses: (respondentId: string) => Promise<void>;
  loadResponseById: (responseId: number) => Promise<void>;
  restoreFormState: () => Promise<void>;
}

// ——— 1) Your data shapes ———
export interface FormData {
  [key: string]: any;
  company: string;
  email: string;
  fullName: string;
  matrixes: { [key: string]: { [key: string]: string } }[];
  phoneNumber: string;
  radios: { [key: string]: string }[];
}

export interface QuestionDefinition {
  id: string;
  options: string[];
  rows?: string[];
  step: number;
  text: string;
  type: 'matrix' | 'radio' | 'text';
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
  responseId?: string;
}

export function FormProvider({ children, responseId: initialResponseId }: FormProviderProps) {
  // survey flow state
  const [formData, setFormData] = useState<FormData>({
    company: '',
    email: '',
    fullName: '',
    matrixes: [],
    phoneNumber: '',
    radios: [],
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const totalSteps = 18;

  // admin UI state
  const [questions, setQuestions] = useState<QuestionDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // database saving state
  const [respondentId, setRespondentId] = useState<string | null>(null);
  const [responseId, setResponseId] = useState<number | null>(null);
  const [hasRestored, setHasRestored] = useState(false);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/questions');
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();

        // Transform database format to QuestionDefinition format
        const transformedQuestions = data.map((q: any) => ({
          id: q.id,
          options: q.options.map((o: any) => o.value),
          rows: q.matrixRows.map((r: any) => r.label),
          step: q.step,
          text: q.text,
          type: q.type.toLowerCase(),
        }));

        setQuestions(transformedQuestions);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching questions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Helper function to get step number from question ID
  const getStepFromQuestionId = (questionId: string): number | null => {
    const questionToStepMap: Record<string, number> = {
      // Step 3: matrix1-matrix10
      'matrix1': 3, 'matrix2': 3, 'matrix3': 3, 'matrix4': 3, 'matrix5': 3,
      'matrix6': 3, 'matrix7': 3, 'matrix8': 3, 'matrix9': 3, 'matrix10': 3,
      // Step 4: matrix11-matrix20
      'matrix11': 4, 'matrix12': 4, 'matrix13': 4, 'matrix14': 4, 'matrix15': 4,
      'matrix16': 4, 'matrix17': 4, 'matrix18': 4, 'matrix19': 4, 'matrix20': 4,
      // Step 5: matrix21-matrix30
      'matrix21': 5, 'matrix22': 5, 'matrix23': 5, 'matrix24': 5, 'matrix25': 5,
      'matrix26': 5, 'matrix27': 5, 'matrix28': 5, 'matrix29': 5, 'matrix30': 5,
      // Step 6: radio1-radio10
      'radio1': 6, 'radio2': 6, 'radio3': 6, 'radio4': 6, 'radio5': 6,
      'radio6': 6, 'radio7': 6, 'radio8': 6, 'radio9': 6, 'radio10': 6,
      // Step 7: radio11-radio20
      'radio11': 7, 'radio12': 7, 'radio13': 7, 'radio14': 7, 'radio15': 7,
      'radio16': 7, 'radio17': 7, 'radio18': 7, 'radio19': 7, 'radio20': 7,
      // Step 8: radio21-radio30
      'radio21': 8, 'radio22': 8, 'radio23': 8, 'radio24': 8, 'radio25': 8,
      'radio26': 8, 'radio27': 8, 'radio28': 8, 'radio29': 8, 'radio30': 8,
      // Step 9: radio31-radio40
      'radio31': 9, 'radio32': 9, 'radio33': 9, 'radio34': 9, 'radio35': 9,
      'radio36': 9, 'radio37': 9, 'radio38': 9, 'radio39': 9, 'radio40': 9,
      // Step 10: radio41-radio50
      'radio41': 10, 'radio42': 10, 'radio43': 10, 'radio44': 10, 'radio45': 10,
      'radio46': 10, 'radio47': 10, 'radio48': 10, 'radio49': 10, 'radio50': 10,
      // Step 11: radio51-radio60
      'radio51': 11, 'radio52': 11, 'radio53': 11, 'radio54': 11, 'radio55': 11,
      'radio56': 11, 'radio57': 11, 'radio58': 11, 'radio59': 11, 'radio60': 11,
      // Step 12: radio61-radio70
      'radio61': 12, 'radio62': 12, 'radio63': 12, 'radio64': 12, 'radio65': 12,
      'radio66': 12, 'radio67': 12, 'radio68': 12, 'radio69': 12, 'radio70': 12,
      // Step 13: radio71-radio80
      'radio71': 13, 'radio72': 13, 'radio73': 13, 'radio74': 13, 'radio75': 13,
      'radio76': 13, 'radio77': 13, 'radio78': 13, 'radio79': 13, 'radio80': 13,
      // Step 14: radio81-radio90
      'radio81': 14, 'radio82': 14, 'radio83': 14, 'radio84': 14, 'radio85': 14,
      'radio86': 14, 'radio87': 14, 'radio88': 14, 'radio89': 14, 'radio90': 14,
      // Step 15: radio91-radio100
      'radio91': 15, 'radio92': 15, 'radio93': 15, 'radio94': 15, 'radio95': 15,
      'radio96': 15, 'radio97': 15, 'radio98': 15, 'radio99': 15, 'radio100': 15,
      // Step 16: radio101-radio110
      'radio101': 16, 'radio102': 16, 'radio103': 16, 'radio104': 16, 'radio105': 16,
      'radio106': 16, 'radio107': 16, 'radio108': 16, 'radio109': 16, 'radio110': 16,
      // Step 17: radio111-radio114
      'radio111': 17, 'radio112': 17, 'radio113': 17, 'radio114': 17,
      // Step 18: radio115-radio117
      'radio115': 18, 'radio116': 18, 'radio117': 18,
    };
    
    return questionToStepMap[questionId] || null;
  };

  // Load saved responses when respondentId changes
  useEffect(() => {
    if (respondentId) {
      loadSavedResponses(respondentId);
    }
  }, [respondentId]);

  // Restore form state on mount if response ID exists
  useEffect(() => {
    if (!hasRestored && initialResponseId) {
      setHasRestored(true);
      restoreFormState();
    }
  }, [initialResponseId, hasRestored]);

  // Create a new question
  const createQuestion = async (question: Omit<QuestionDefinition, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/questions', {
        body: JSON.stringify({
          ...question,
          id: Date.now().toString(),
          type: question.type.toUpperCase(),
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to create question');

      const data = await res.json();
      setQuestions((prev) => [
        ...prev,
        {
          ...question,
          id: data.id,
        },
      ]);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a question
  const updateQuestion = async (question: QuestionDefinition) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/questions', {
        body: JSON.stringify({
          ...question,
          type: question.type.toUpperCase(),
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
      });

      if (!res.ok) throw new Error('Failed to update question');

      setQuestions((prev) =>
        prev.map((q) => (q.id === question.id ? question : q)),
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a question
  const deleteQuestion = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/questions?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete question');

      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // merge in radio or matrix updates by key
  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => {
      const next = { ...prev };

      if (stepData.radios) {
        stepData.radios.forEach((r) => {
          const key = Object.keys(r)[0];
          const idx = next.radios.findIndex((x) => Object.keys(x)[0] === key);
          if (idx >= 0) next.radios[idx] = r;
          else next.radios.push(r);
        });
        delete (stepData as any).radios;
      }

      if (stepData.matrixes) {
        stepData.matrixes.forEach((m) => {
          const key = Object.keys(m)[0];
          const idx = next.matrixes.findIndex((x) => Object.keys(x)[0] === key);
          if (idx >= 0) next.matrixes[idx] = m;
          else next.matrixes.push(m);
        });
        delete (stepData as any).matrixes;
      }

      return { ...next, ...stepData };
    });
  };

  const isStepCompleted = (step: number) => completedSteps.has(step);

  const markStepCompleted = (step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step));
  };

  const updateEmail = (email: string) => {
    setFormData((prev) => ({ ...prev, email: email }));
  };

  const resetForm = () => {
    setFormData({
      company: '',
      email: '',
      fullName: '',
      matrixes: [],
      phoneNumber: '',
      radios: [],
    });
    setCurrentStep(1);
    setCompletedSteps(new Set());
    setRespondentId(null);
    setResponseId(null);
    setHasRestored(false);
  };

  // Save respondent data to database
  const saveRespondent = async (data: { fullName: string; email: string; phoneNumber: string; company: string }) => {
    try {
      const response = await fetch('/api/respondent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save respondent data');
      }

      const respondent = await response.json();
      setRespondentId(respondent.id);

      await updateResponseWithRespondent(respondent.id);
    } catch (err: any) {
      console.error('Error saving respondent:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update existing response record with respondentId
  const updateResponseWithRespondent = async (respondentId: string) => {
    try {
      const response = await fetch('/api/response/update-respondent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respondentId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update response with respondent');
      }

      const result = await response.json();
      setResponseId(result.responseId);
    } catch (err: any) {
      console.error('Error updating response with respondent:', err);
      setError(err.message);
      throw err;
    }
  };


  // Save step response to database
  const saveStepResponse = async (step: number, answers: Record<string, any>) => {
    if (!respondentId) {
      throw new Error('No respondent ID available');
    }


    try {
      const response = await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respondentId,
          step,
          answers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save step response');
      }

      const result = await response.json();
      if (result.responseId) {
        setResponseId(result.responseId);
      }
    } catch (err: any) {
      console.error('Error saving step response:', err);
      setError(err.message);
      throw err;
    }
  };

  // Load saved responses from database
  const loadSavedResponses = async (respondentId: string) => {
    try {
      const response = await fetch(`/api/response/${respondentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to load saved responses');
      }

      const responses = await response.json();

      // Process saved responses and update form data
      if (responses.length > 0) {
        const responseData = responses[0]; // Get the first response
        setResponseId(responseData.id); // Set the response ID
        
        const loadedFormData: Partial<FormData> = {
          matrixes: [],
          radios: [],
        };

        // Process answers and reconstruct form data
        for (const answer of responseData.answers) {
          const { questionId, value } = answer;
          
          // Handle normalized JSON structure
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            if (value.type === 'radio') {
              // It's a radio question
              loadedFormData.radios!.push({ [questionId]: value.value });
            } else if (value.type === 'matrix') {
              // It's a matrix question - remove the type field
              const { type, ...matrixValue } = value;
              loadedFormData.matrixes!.push({ [questionId]: matrixValue });
            } else {
              // Legacy or other format
              loadedFormData.radios!.push({ [questionId]: value.value || value });
            }
          } else if (typeof value === 'string') {
            // Legacy string format
            loadedFormData.radios!.push({ [questionId]: value });
          }
        }

        // Update form data with loaded responses
        updateFormData(loadedFormData);
        
        // Mark completed steps based on loaded data
        const completedStepsSet = new Set<number>();
        for (const answer of responseData.answers) {
          // You might want to add logic here to determine which steps are completed
          // based on the question IDs and their corresponding steps
        }
        setCompletedSteps(completedStepsSet);
      }
    } catch (err: any) {
      console.error('Error loading saved responses:', err);
      setError(err.message);
    }
  };

  // Load response data by responseId (for page refresh)
  const loadResponseById = async (responseId: number) => {
    try {
      const response = await fetch(`/api/response/by-id?id=${responseId}`);
      
      if (!response.ok) {
        throw new Error('Failed to load response data');
      }

      const responseData = await response.json();

      // Set response and respondent IDs
      setResponseId(responseData.id);
      if (responseData.respondent) {
        setRespondentId(responseData.respondent.id);
      }

      // Load respondent data into form
      if (responseData.respondent) {
        const respondent = responseData.respondent;
        updateFormData({
          fullName: respondent.fullName,
          email: respondent.email,
          phoneNumber: respondent.phoneNumber,
          company: respondent.company,
        });
      }

      // Process answers and reconstruct form data
      const loadedFormData: Partial<FormData> = {
        matrixes: [],
        radios: [],
      };

      // Separate matrix and radio answers
      const matrixAnswers: Record<string, any> = {};
      const radioAnswers: Record<string, any> = {};

      for (const answer of responseData.answers) {
        const { questionId, value } = answer;
        
        // Handle normalized JSON structure
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          if (value.type === 'radio') {
            // It's a radio question
            radioAnswers[questionId] = value.value;
          } else if (value.type === 'matrix') {
            // It's a matrix question - remove the type field
            const { type, ...matrixValue } = value;
            matrixAnswers[questionId] = matrixValue;
          } else {
            // Legacy or other format
            radioAnswers[questionId] = value.value || value;
          }
        } else if (typeof value === 'string') {
          // Legacy string format
          radioAnswers[questionId] = value;
        }
      }

      // Convert to the expected format for formData
      // Matrix data should be in format: [{ matrix1: {...}, matrix2: {...} }]
      // Radio data should be in format: [{ radio1: "value", radio2: "value" }]
      
      // Group matrix answers by step (matrix1-10 = step 3, matrix11-20 = step 4, etc.)
      const matrixGroups: Record<number, Record<string, any>> = {};
      Object.entries(matrixAnswers).forEach(([questionId, value]) => {
        const step = getStepFromQuestionId(questionId);
        if (step) {
          if (!matrixGroups[step]) matrixGroups[step] = {};
          matrixGroups[step][questionId] = value;
        }
      });

      // Add matrix groups to formData
      Object.values(matrixGroups).forEach(group => {
        if (Object.keys(group).length > 0) {
          loadedFormData.matrixes!.push(group);
        }
      });

      // Group radio answers by step
      const radioGroups: Record<number, Record<string, any>> = {};
      Object.entries(radioAnswers).forEach(([questionId, value]) => {
        const step = getStepFromQuestionId(questionId);
        if (step) {
          if (!radioGroups[step]) radioGroups[step] = {};
          radioGroups[step][questionId] = value;
        }
      });

      // Add radio groups to formData
      Object.values(radioGroups).forEach(group => {
        if (Object.keys(group).length > 0) {
          loadedFormData.radios!.push(group);
        }
      });

      // Update form data with loaded responses
      updateFormData(loadedFormData);
      
      // Determine the last completed step and set current step
      const completedStepsSet = new Set<number>();
      let lastCompletedStep = 0; 

      // Determine completed steps based on answered questions
      for (const answer of responseData.answers) {
        const step = getStepFromQuestionId(answer.questionId);
        if (step) {
          completedStepsSet.add(step);
          if (step > lastCompletedStep) {
            lastCompletedStep = step;
          }
        }
      }

      setCompletedSteps(completedStepsSet);
      
      // Set current step to the next incomplete step
      // If no answers exist (fresh assessment), start at step 1
      if (responseData.answers.length === 0) {
        setCurrentStep(1);
      } else {
        const nextStep = lastCompletedStep + 1;
        if (nextStep <= 18) {
          setCurrentStep(nextStep);
        } else {
          setCurrentStep(18); // If all steps are completed, stay on step 18
        }
      }

    } catch (err: any) {
      console.error('Error loading response by ID:', err);
      setError(err.message);
    }
  };

  // Restore form state from response ID on page load
  const restoreFormState = async () => {
    try {
      
      if (initialResponseId) {
        const responseId = parseInt(initialResponseId);
        if (!isNaN(responseId)) {
          await loadResponseById(responseId);
        }
      } else {
      }
    } catch (err: any) {
      console.error('❌ Error restoring form state:', err);
      setError(err.message);
    }
  };

  return (
    <FormContext.Provider
      value={{
        completedSteps,
        createQuestion,
        currentStep,
        deleteQuestion,
        error,
        formData,
        isLoading,
        isStepCompleted,
        loadSavedResponses,
        loadResponseById,
        markStepCompleted,
        questions,
        resetForm,
        restoreFormState,
        respondentId,
        responseId,
        saveRespondent,
        saveStepResponse,
        setCurrentStep,
        setQuestions,
        totalSteps,
        updateEmail,
        updateFormData,
        updateQuestion,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
