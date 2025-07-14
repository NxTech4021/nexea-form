// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Allowlist } from '@prisma/client';
import { Loader2Icon, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

import { QuestionDefinition, useFormContext, FormProvider } from '@/contexts/form-context';
import { PreviewSteps } from '@/components/admin/PreviewSteps';
import { Spinner } from '@/components/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { signOut } from '../actions/auth';
import EmailListView from './components/email-list-view';

// Import question data from steps
import * as StepQuestions from '@/components/steps';

// Type definitions
type AdminTab = 'emails' | 'form' | 'preview';
type QuestionType = 'matrix' | 'radio' | 'text';

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('emails');
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const router = useRouter();

  const [emails, setEmails] = useState<Allowlist[]>([]);
  
  // Handle sign out state
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutSuccess, setSignOutSuccess] = useState(false);
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const result = await signOut({});
      setSignOutSuccess(result.success);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Email allowlist functions
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const emails = emailInput
        .split(/[\n,]/)
        .map((e) => e.trim())
        .filter(Boolean);

      for (const email of emails) {
        const res = await fetch('/api/admin/allowlist', {
          body: JSON.stringify({ credits: 1, email }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to add email');
        }

        const { data } = await res.json();

        setEmails((prev) => [data, ...prev]);
      }

      setSuccess(`Successfully added ${emails.length} email(s) to allowlist`);
      setEmailInput('');
    } catch (err: any) {
      setError(err.message || 'Failed to add email(s) to allowlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRow = async ({ id }: { id: number }) => {
    try {
      const res = await fetch('/api/admin/allowlist', {
        body: JSON.stringify({ id }),
        method: 'DELETE',
      });

      const data = await res.json();

      setEmails((prev) => prev.filter((a) => a.id != id));

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (signOutSuccess) {
      router.push('/auth/login');
    }
  }, [signOutSuccess, router]);

  useEffect(() => {
    fetch('/api/admin/allowlist', {
      method: 'GET',
    })
      .then(async (data) => await data.json())
      .then((data) => setEmails(data));
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      {/* Modern Header */}
      <header className='sticky top-0 z-50 bg-card border-border border-b'>
        <div className='flex items-center justify-between px-6 h-16'>
          <div className='flex items-center gap-6'>
            {/* <Link
                className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
                href='/'
              >
                <svg
                  className='lucide lucide-chevron-left'
                  fill='none'
                  height='20'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='m15 18-6-6 6-6' />
                </svg>
                <span>Back to Survey</span>
              </Link> */}
            {/* <div className='h-6 w-px bg-border' /> */}
            <div className='flex items-center gap-4'>
              <Image
                alt='NEXEA Logo'
                height={32}
                src='/nexealogo.png'
                width={32}
              />
              <h1 className='text-xl font-bold tracking-tight text-foreground'>
                Assessment Form Editor
              </h1>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <form action={handleSignOut}>
              <Button
                disabled={isSigningOut}
                size={'sm'}
                type='submit'
                variant='outline'
              >
                {isSigningOut ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  <LogOut rotate={90} />
                )}
                Logout
              </Button>
            </form>
            {/* <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <div className='w-2 h-2 rounded-full bg-primary' />
                All changes saved
              </div> */}
          </div>
        </div>
      </header>
      <FormProvider>
        <main className='p-6 max-w-6xl mx-auto space-y-6'>
          <Tabs
            className='w-full'
            onValueChange={(v) => setTab(v as AdminTab)}
            value={tab}
          >
            <TabsList className='grid w-full h-fit sm:grid-cols-3 grid-cols-1  gap-1 overflow-auto'>
              <TabsTrigger
                className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75'
                value='form'
              >
                Form Editor
              </TabsTrigger>
              <TabsTrigger
                className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75'
                value='emails'
              >
                Email Management
              </TabsTrigger>
              <TabsTrigger
                className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75'
                value='preview'
              >
                Preview Form
              </TabsTrigger>
            </TabsList>

            <TabsContent className='space-y-4' value='form'>
              <FormEditor />
            </TabsContent>

            <TabsContent value='emails'>
              <Card>
                <CardHeader>
                  <CardTitle>Email Allowlist Management</CardTitle>
                  <CardDescription>
                    Add emails to the allowlist. Each email will receive 1
                    credit. Enter multiple emails separated by commas or
                    newlines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className='space-y-4' onSubmit={handleEmailSubmit}>
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium'>
                        Email Addresses
                      </label>
                      <Textarea
                        className='font-mono'
                        disabled={isSubmitting}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder='Enter emails (one per line or comma-separated)&#10;example1@domain.com&#10;example2@domain.com'
                        rows={6}
                        value={emailInput}
                      />
                    </div>
                    {error && (
                      <Alert variant='destructive'>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert
                        className='bg-green-50 border-green-200'
                        variant='default'
                      >
                        <AlertDescription className='text-green-800'>
                          {success}
                        </AlertDescription>
                      </Alert>
                    )}
                    <Button
                      className='w-full'
                      disabled={isSubmitting || !emailInput.trim()}
                      type='submit'
                    >
                      {isSubmitting ? (
                        <span className='flex items-center gap-2'>
                          <Spinner size='sm' />
                          Adding...
                        </span>
                      ) : (
                        'Add to Allowlist'
                      )}
                    </Button>
                  </form>
                  <EmailListView emails={emails} onDelete={handleDeleteRow} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='preview'>
              <PreviewSteps />
            </TabsContent>
          </Tabs>
        </main>
      </FormProvider>
    </div>
  );
}

// Separate the form editor component
function FormEditor() {
  const {
    createQuestion,
    deleteQuestion,
    error,
    isLoading,
    questions,
    updateQuestion,
  } = useFormContext();
  const [adminStep, setAdminStep] = useState<number>(1);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);
  
  // Add state for editing text fields with proper type definitions
  const [editingText, setEditingText] = useState<Record<string, string>>({});
  const [editingRows, setEditingRows] = useState<Record<string, string[]>>({});
  const [editingOptions, setEditingOptions] = useState<Record<string, string[]>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  // Form editor state and functions
  const stepQs = questions.filter((q) => q.step === adminStep);

  // Initialize editing state when questions change
  useEffect(() => {
    const newEditingText: Record<string, string> = {};
    const newEditingRows: Record<string, string[]> = {};
    const newEditingOptions: Record<string, string[]> = {};
    
    questions.forEach(q => {
      newEditingText[q.id] = q.text;
      if (q.rows) newEditingRows[q.id] = [...q.rows];
      if (q.options) newEditingOptions[q.id] = [...q.options];
    });
    
    setEditingText(newEditingText);
    setEditingRows(newEditingRows);
    setEditingOptions(newEditingOptions);
  }, [questions]);

  const handleUpdateQuestion = async (
    id: string,
    patch: Partial<QuestionDefinition>
  ) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;

    setSavingId(id);
    
    try {
      await updateQuestion({
        ...question,
        ...patch,
      });
      toast.success('Question updated successfully');
    } catch (err) {
      console.error('Failed to update question:', err);
      toast.error('Failed to update question');
    } finally {
      setSavingId(null);
    }
  };

  const handleTextChange = (id: string, value: string) => {
    setEditingText(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleTextSave = async (id: string) => {
    const text = editingText[id];
    if (text !== undefined) {
      await handleUpdateQuestion(id, { text });
    }
  };
  
  const handleOptionChange = (id: string, index: number, value: string) => {
    setEditingOptions(prev => {
      const options = [...(prev[id] || [])];
      options[index] = value;
      return {
        ...prev,
        [id]: options
      };
    });
  };
  
  const handleOptionSave = async (id: string) => {
    const options = editingOptions[id];
    if (options) {
      await handleUpdateQuestion(id, { options });
    }
  };
  
  const handleRowChange = (id: string, index: number, value: string) => {
    setEditingRows(prev => {
      const rows = [...(prev[id] || [])];
      rows[index] = value;
      return {
        ...prev,
        [id]: rows
      };
    });
  };
  
  const handleRowSave = async (id: string) => {
    const rows = editingRows[id];
    if (rows) {
      await handleUpdateQuestion(id, { rows });
    }
  };

  const handleAddQuestion = async () => {
    try {
      await createQuestion({
        options: [],
        rows: [],
        step: adminStep,
        text: 'New question',
        type: 'text',
      });
      toast.success('Question added successfully');
    } catch (err) {
      console.error('Failed to create question:', err);
      toast.error('Failed to create question');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestion(id);
      toast.success('Question deleted successfully');
    } catch (err) {
      console.error('Failed to delete question:', err);
      toast.error('Failed to delete question');
    }
  };

  // Function to sync with step files data
  const syncWithStepFiles = async () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    
    try {
      // Get all questions from step files
      const allStepQuestions: QuestionDefinition[] = [];
      
      // Extract questions from each step file
      Object.entries(StepQuestions).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          allStepQuestions.push(...value);
        }
      });
      
      console.log(`Found ${allStepQuestions.length} questions in step files`);
      
      // Instead of deleting all questions, we'll update existing ones and only delete those not in the step files
      const existingQuestionIds = new Set(questions.map(q => q.id));
      const stepQuestionIds = new Set(allStepQuestions.map(q => q.id));
      
      // Questions to delete (exist in DB but not in step files)
      const questionsToDelete = [...existingQuestionIds].filter(id => !stepQuestionIds.has(id));
      console.log(`Deleting ${questionsToDelete.length} questions that are not in step files`);
      
      // Track success and failures
      let deleteSuccessCount = 0;
      let deleteFailCount = 0;
      let createUpdateSuccessCount = 0;
      let createUpdateFailCount = 0;
      
      // Delete questions one by one with a small delay
      for (const id of questionsToDelete) {
        try {
          console.log(`Deleting question ${id}...`);
          await deleteQuestion(id);
          deleteSuccessCount++;
          // Add a small delay between deletes
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err) {
          console.error(`Failed to delete question ${id}:`, err);
          deleteFailCount++;
          // Continue with other questions even if one fails
        }
      }
      
      // Update or create questions from step files
      console.log(`Creating/updating ${allStepQuestions.length} questions from step files`);
      
      // Process questions in smaller batches with longer delays
      const batchSize = 3;
      for (let i = 0; i < allStepQuestions.length; i += batchSize) {
        const batch = allStepQuestions.slice(i, i + batchSize);
        
        const results = await Promise.allSettled(batch.map(async (question) => {
          try {
            if (existingQuestionIds.has(question.id)) {
              // Update existing question
              console.log(`Updating question ${question.id}...`);
              await updateQuestion({
                ...question,
                options: question.options || [],
                rows: question.rows || [],
              });
            } else {
              // Create new question
              console.log(`Creating question ${question.id}...`);
              await createQuestion({
                options: question.options || [],
                rows: question.rows || [],
                step: question.step,
                text: question.text,
                type: question.type,
              });
            }
            return true;
          } catch (err) {
            console.error(`Failed to process question ${question.id}:`, err);
            return false;
          }
        }));
        
        // Count successes and failures
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value) {
            createUpdateSuccessCount++;
          } else {
            createUpdateFailCount++;
          }
        });
        
        // Add a longer delay between batches
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Log final results
      console.log(`Sync complete. Results:
        - Deleted: ${deleteSuccessCount} success, ${deleteFailCount} failed
        - Created/Updated: ${createUpdateSuccessCount} success, ${createUpdateFailCount} failed
      `);
      
      // Mark as success if we had more successes than failures
      const isOverallSuccess = (deleteSuccessCount + createUpdateSuccessCount) > 
                               (deleteFailCount + createUpdateFailCount);
      
      setSyncSuccess(isOverallSuccess);
      
      if (isOverallSuccess) {
        toast.success(`Successfully synced with step files (${createUpdateSuccessCount}/${allStepQuestions.length} questions processed)`);
      } else {
        toast.error(`Sync completed with errors (${createUpdateFailCount} failures)`);
      }
    } catch (err) {
      console.error('Failed to sync with step files:', err);
      toast.error('Failed to sync with step files');
    } finally {
      // Ensure we always exit the loading state
      setIsSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Form Editor</CardTitle>
          <CardDescription>
            Edit your form questions and structure. Click Save after making changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4 mb-4'>
            <div className='flex-1'>
              <Select
                onValueChange={(v) => setAdminStep(Number(v))}
                value={String(adminStep)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select step to edit' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 18 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      Step {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button disabled={isLoading} onClick={handleAddQuestion}>
              + Add Question
            </Button>
          </div>
          
          <div className='flex justify-end'>
            <Button 
              onClick={syncWithStepFiles}
              disabled={isSyncing}
              variant="outline"
            >
              {isSyncing ? (
                <span className='flex items-center gap-2'>
                  <Spinner size='sm' />
                  Syncing...
                </span>
              ) : (
                'Sync with Step Files'
              )}
            </Button>
          </div>
          
          {syncSuccess && (
            <Alert 
              className='bg-green-50 border-green-200 mt-4'
              variant='default'
            >
              <AlertDescription className='text-green-800'>
                Successfully synced questions with step files
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ScrollArea className='h-[600px] rounded-md border'>
        <div className='p-6 space-y-6'>
          <Accordion className='w-full' collapsible type='single'>
            {stepQs.map((q, idx) => (
              <AccordionItem key={q.id} value={q.id}>
                <AccordionTrigger className='hover:no-underline'>
                  <div className='flex items-center gap-4'>
                    <Badge variant='outline'>Q{idx + 1}</Badge>
                    <span className='font-normal text-left'>
                      {q.text.length > 60
                        ? q.text.substring(0, 60) + '...'
                        : q.text}
                    </span>
                    <Badge>{q.type}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent className='pt-6 space-y-6'>
                      {/* Question Text */}
                      <div className='space-y-2'>
                        <div className="flex justify-between items-center">
                          <label className='text-sm font-medium'>
                            Question Text
                          </label>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleTextSave(q.id)}
                            disabled={savingId === q.id}
                          >
                            {savingId === q.id ? (
                              <span className='flex items-center gap-2'>
                                <Spinner size='sm' />
                                Saving...
                              </span>
                            ) : 'Save Text'}
                          </Button>
                        </div>
                        <Textarea
                          className='min-h-[100px]'
                          onChange={(e) => handleTextChange(q.id, e.target.value)}
                          placeholder='Enter your question'
                          value={editingText[q.id] || ''}
                        />
                      </div>

                      <Separator />

                      {/* Question Type */}
                      <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                          Question Type
                        </label>
                        <Select
                          onValueChange={(v) =>
                            handleUpdateQuestion(q.id, {
                              type: v as QuestionType,
                            })
                          }
                          value={q.type}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='text'>Text Input</SelectItem>
                            <SelectItem value='radio'>
                              Multiple Choice
                            </SelectItem>
                            <SelectItem value='matrix'>Matrix</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Radio Options */}
                      {q.type === 'radio' && (
                        <div className='space-y-4'>
                          <div className='flex justify-between items-center'>
                            <label className='text-sm font-medium'>
                              Answer Options
                            </label>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  const options = [...(editingOptions[q.id] || []), ''];
                                  setEditingOptions(prev => ({
                                    ...prev,
                                    [q.id]: options
                                  }));
                                }}
                                size='sm'
                                variant='outline'
                              >
                                Add Option
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handleOptionSave(q.id)}
                                disabled={savingId === q.id}
                              >
                                {savingId === q.id ? (
                                  <span className='flex items-center gap-2'>
                                    <Spinner size='sm' />
                                    Saving...
                                  </span>
                                ) : 'Save Options'}
                              </Button>
                            </div>
                          </div>
                          <div className='space-y-2'>
                            {(editingOptions[q.id] || []).map((opt, i) => (
                              <div className='flex items-center gap-2' key={i}>
                                <Input
                                  onChange={(e) => handleOptionChange(q.id, i, e.target.value)}
                                  placeholder={`Option ${i + 1}`}
                                  value={opt}
                                />
                                <Button
                                  onClick={() => {
                                    const options = (editingOptions[q.id] || []).filter(
                                      (_, j) => j !== i
                                    );
                                    setEditingOptions(prev => ({
                                      ...prev,
                                      [q.id]: options
                                    }));
                                  }}
                                  size='icon'
                                  variant='ghost'
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Matrix Rows */}
                      {q.type === 'matrix' && (
                        <div className='space-y-4'>
                          <div className='flex justify-between items-center'>
                            <label className='text-sm font-medium'>
                              Matrix Rows
                            </label>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  const rows = [...(editingRows[q.id] || []), ''];
                                  setEditingRows(prev => ({
                                    ...prev,
                                    [q.id]: rows
                                  }));
                                }}
                                size='sm'
                                variant='outline'
                              >
                                Add Row
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handleRowSave(q.id)}
                                disabled={savingId === q.id}
                              >
                                {savingId === q.id ? (
                                  <span className='flex items-center gap-2'>
                                    <Spinner size='sm' />
                                    Saving...
                                  </span>
                                ) : 'Save Rows'}
                              </Button>
                            </div>
                          </div>
                          <div className='space-y-2'>
                            {(editingRows[q.id] || []).map((row, i) => (
                              <div className='flex items-center gap-2' key={i}>
                                <Input
                                  onChange={(e) => handleRowChange(q.id, i, e.target.value)}
                                  placeholder={`Row ${i + 1}`}
                                  value={row}
                                />
                                <Button
                                  onClick={() => {
                                    const rows = (editingRows[q.id] || []).filter(
                                      (_, j) => j !== i
                                    );
                                    setEditingRows(prev => ({
                                      ...prev,
                                      [q.id]: rows
                                    }));
                                  }}
                                  size='icon'
                                  variant='ghost'
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className='flex justify-end pt-6'>
                      <Button
                        disabled={isLoading || savingId === q.id}
                        onClick={() => handleDeleteQuestion(q.id)}
                        variant='destructive'
                      >
                        Delete Question
                      </Button>
                    </CardFooter>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {stepQs.length === 0 && (
            <Card>
              <CardContent className='py-8'>
                <div className='text-center text-muted-foreground'>
                  No questions in this step yet.
                  <br />
                  Click Add &quot;Question&quot; to create one.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
