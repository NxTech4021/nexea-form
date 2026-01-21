// src/app/admin/page.tsx
'use client';

import Image from 'next/image';
import { useActionState, useEffect, useRef, useState } from 'react';

import { QuestionDefinition, useFormContext } from '@/contexts/form-context';
import { FormProvider } from '@/contexts/form-context';

type AdminTab = 'emails' | 'form' | 'preview';
type QuestionType = 'matrix' | 'radio' | 'text';

import { Allowlist } from '@prisma/client';
import { Loader2Icon, LogOut } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { stableSignOut } from '@/app/actions/stable-auth';
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

import EmailListView from './components/email-list-view';

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('emails');
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const router = useRouter();

  const ref = useRef(null);

  const [emails, setEmails] = useState<Allowlist[]>([]);

  const [state, formAction, isPending] = useActionState(
    async () => {
      const result = await stableSignOut();
      if (result.success) {
        redirect('/auth/login');
      }
      return result;
    },
    { success: false },
  );

  // Email allowlist functions
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const emails = emailInput
        .split(/[\n, ]/)
        .map((e) => e.trim())
        .filter(Boolean);

      for (const email of emails) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;

        const isEmailValid = emailRegex.test(email);

        if (!isEmailValid) {
          toast.error(`${email} is invalid email`);
          return false;
        }

        const res = await fetch('/api/admin/allowlist', {
          body: JSON.stringify({ credits: 2, email }),
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
    if (state?.success) {
      router.push('/auth/login');
    }
  }, [state, router]);

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
            <form action={formAction}>
              <Button
                disabled={isPending}
                size={'sm'}
                type='submit'
                variant='outline'
              >
                {isPending ? (
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
                disabled
                value='form'
              >
                Form Editor ( In development )
              </TabsTrigger>
              <TabsTrigger
                className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75'
                value='emails'
              >
                Email Management
              </TabsTrigger>
              <TabsTrigger
                className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75'
                disabled
                value='preview'
              >
                Preview Form ( In development )
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
                        // onKeyDown={(e) => {
                        //   // e.preventDefault();
                        //   if (e.code === 'Space') {
                        //     if (ref.current) {
                        //       const textarea =
                        //         ref.current as HTMLTextAreaElement;
                        //       const start = textarea.selectionStart;
                        //       const end = textarea.selectionEnd;

                        //       // Insert newline instead of space
                        //       const newValue =
                        //         textarea.value.substring(0, start) +
                        //         '\n' +
                        //         textarea.value.substring(end);

                        //       console.log(newValue);

                        //       setEmailInput(newValue);

                        //       // Move cursor after newline
                        //       requestAnimationFrame(() => {
                        //         textarea.selectionStart =
                        //           textarea.selectionEnd = start + 1;
                        //       });
                        //     }
                        //   }
                        // }}
                        placeholder='Enter emails (one per line or comma-separated)&#10;example1@domain.com&#10;example2@domain.com'
                        ref={ref}
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

                  {/* <Button
                    onClick={async () => {
                      await fetch('/api/email', {
                        method: 'POST',
                      });
                    }}
                  >
                    Send Test Email {process.env.RESEND_API_KEY}
                  </Button> */}

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

  // Form editor state and functions
  const stepQs = questions.filter((q) => q.step === adminStep);

  const handleUpdateQuestion = async (
    id: string,
    patch: Partial<QuestionDefinition>,
  ) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;

    try {
      await updateQuestion({
        ...question,
        ...patch,
      });
    } catch (err) {
      console.error('Failed to update question:', err);
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
    } catch (err) {
      console.error('Failed to create question:', err);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestion(id);
    } catch (err) {
      console.error('Failed to delete question:', err);
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
            Edit your form questions and structure. Changes are saved
            automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <div className='flex-1'>
              <Select
                onValueChange={(v) => setAdminStep(Number(v))}
                value={String(adminStep)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select step to edit' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => (
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
                        <label className='text-sm font-medium'>
                          Question Text
                        </label>
                        <Textarea
                          className='min-h-[100px]'
                          onChange={(e) =>
                            handleUpdateQuestion(q.id, { text: e.target.value })
                          }
                          placeholder='Enter your question'
                          value={q.text}
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
                            <Button
                              onClick={() =>
                                handleUpdateQuestion(q.id, {
                                  options: [...q.options, ''],
                                })
                              }
                              size='sm'
                              variant='outline'
                            >
                              Add Option
                            </Button>
                          </div>
                          <div className='space-y-2'>
                            {q.options.map((opt, i) => (
                              <div className='flex items-center gap-2' key={i}>
                                <Input
                                  onChange={(e) => {
                                    const opts = [...q.options];
                                    opts[i] = e.target.value;
                                    handleUpdateQuestion(q.id, {
                                      options: opts,
                                    });
                                  }}
                                  placeholder={`Option ${i + 1}`}
                                  value={opt}
                                />
                                <Button
                                  onClick={() => {
                                    const opts = q.options.filter(
                                      (_, j) => j !== i,
                                    );
                                    handleUpdateQuestion(q.id, {
                                      options: opts,
                                    });
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
                            <Button
                              onClick={() =>
                                handleUpdateQuestion(q.id, {
                                  rows: [...(q.rows ?? []), ''],
                                })
                              }
                              size='sm'
                              variant='outline'
                            >
                              Add Row
                            </Button>
                          </div>
                          <div className='space-y-2'>
                            {(q.rows ?? []).map((row, i) => (
                              <div className='flex items-center gap-2' key={i}>
                                <Input
                                  onChange={(e) => {
                                    const rows = [...(q.rows ?? [])];
                                    rows[i] = e.target.value;
                                    handleUpdateQuestion(q.id, { rows });
                                  }}
                                  placeholder={`Row ${i + 1}`}
                                  value={row}
                                />
                                <Button
                                  onClick={() => {
                                    const rows = (q.rows ?? []).filter(
                                      (_, j) => j !== i,
                                    );
                                    handleUpdateQuestion(q.id, { rows });
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
                        disabled={isLoading}
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
