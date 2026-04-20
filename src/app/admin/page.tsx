'use client';

import Image from 'next/image';
import { useActionState, useCallback, useEffect, useRef, useState } from 'react';

import { QuestionDefinition, useFormContext } from '@/contexts/form-context';
import { FormProvider } from '@/contexts/form-context';

type AdminTab = 'answers' | 'emails' | 'form' | 'preview';
type QuestionType = 'matrix' | 'radio' | 'text';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Allowlist } from '@prisma/client';
import { GripVertical, Loader2Icon, LogOut } from 'lucide-react';
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

import { allQuestions } from '@/lib/allQuestions';

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
      if (result.success) redirect('/auth/login');
      return result;
    },
    { success: false },
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const emailList = emailInput
        .split(/[\n, ]/)
        .map((e) => e.trim())
        .filter(Boolean);

      for (const email of emailList) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
        if (!emailRegex.test(email)) {
          toast.error(`${email} is invalid email`);
          return;
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
      setSuccess(`Successfully added ${emailList.length} email(s) to allowlist`);
      setEmailInput('');
    } catch (err: any) {
      setError(err.message || 'Failed to add email(s) to allowlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRow = async ({ id }: { id: number }): Promise<null | undefined> => {
    try {
      const res = await fetch('/api/admin/allowlist', {
        body: JSON.stringify({ id }),
        method: 'DELETE',
      });
      const data = await res.json();
      setEmails((prev) => prev.filter((a) => a.id !== id));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  useEffect(() => {
    if (state?.success) router.push('/auth/login');
  }, [state, router]);

  useEffect(() => {
    fetch('/api/admin/allowlist', { method: 'GET' })
      .then((r) => r.json())
      .then((d) => setEmails(d));
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      <header className='sticky top-0 z-50 bg-card border-border border-b'>
        <div className='flex items-center justify-between px-6 h-16'>
          <div className='flex items-center gap-4'>
            <Image alt='NEXEA Logo' height={32} src='/nexealogo.png' width={32} />
            <h1 className='text-xl font-bold tracking-tight text-foreground'>
              Assessment Form Editor
            </h1>
          </div>
          <form action={formAction}>
            <Button disabled={isPending} size='sm' type='submit' variant='outline'>
              {isPending ? <Loader2Icon className='animate-spin' /> : <LogOut rotate={90} />}
              Logout
            </Button>
          </form>
        </div>
      </header>

      <FormProvider>
        <main className='p-6 max-w-6xl mx-auto space-y-6'>
          <Tabs className='w-full' onValueChange={(v) => setTab(v as AdminTab)} value={tab}>
            <TabsList className='grid w-full h-fit sm:grid-cols-4 grid-cols-2 gap-1'>
              <TabsTrigger className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75' value='form'>
                Form Editor
              </TabsTrigger>
              <TabsTrigger className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75' value='emails'>
                Email Management
              </TabsTrigger>
              <TabsTrigger className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75' value='preview'>
                Preview Form
              </TabsTrigger>
              <TabsTrigger className='cursor-pointer hover:bg-background hover:shadow transition-all duration-75' value='answers'>
                View Answers
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
                    Add emails to the allowlist. Each email will receive 1 credit. Enter multiple emails separated by commas or newlines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className='space-y-4' onSubmit={handleEmailSubmit}>
                    <div className='space-y-2'>
                      <label className='block text-sm font-medium'>Email Addresses</label>
                      <Textarea
                        className='font-mono'
                        disabled={isSubmitting}
                        onChange={(e) => setEmailInput(e.target.value)}
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
                      <Alert className='bg-green-50 border-green-200' variant='default'>
                        <AlertDescription className='text-green-800'>{success}</AlertDescription>
                      </Alert>
                    )}
                    <Button className='w-full' disabled={isSubmitting || !emailInput.trim()} type='submit'>
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

            <TabsContent value='answers'>
              <AnswersView />
            </TabsContent>
          </Tabs>
        </main>
      </FormProvider>
    </div>
  );
}

// ─── Sortable Question Item ───────────────────────────────────────────────────
function SortableQuestion({
  q,
  idx,
  isLoading,
  onUpdate,
  onDelete,
}: {
  q: QuestionDefinition;
  idx: number;
  isLoading: boolean;
  onUpdate: (id: string, patch: Partial<QuestionDefinition>) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: q.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <AccordionItem value={q.id}>
        <AccordionTrigger className='hover:no-underline'>
          <div className='flex items-center gap-3 w-full'>
            <button
              {...attributes}
              {...listeners}
              className='cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1'
              onClick={(e) => e.stopPropagation()}
              type='button'
            >
              <GripVertical size={16} />
            </button>
            <Badge variant='outline'>Q{idx + 1}</Badge>
            <span className='font-normal text-left flex-1'>
              {q.text.length > 60 ? q.text.substring(0, 60) + '...' : q.text}
            </span>
            <Badge>{q.type}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent className='pt-6 space-y-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Question Text</label>
                <Textarea
                  className='min-h-[100px]'
                  onBlur={(e) => onUpdate(q.id, { text: e.target.value })}
                  defaultValue={q.text}
                  placeholder='Enter your question'
                />
              </div>
              <Separator />
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Question Type</label>
                <Select
                  onValueChange={(v) => onUpdate(q.id, { type: v as QuestionType })}
                  value={q.type}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='text'>Text Input</SelectItem>
                    <SelectItem value='radio'>Multiple Choice</SelectItem>
                    <SelectItem value='matrix'>Matrix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              {q.type === 'radio' && (
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <label className='text-sm font-medium'>Answer Options</label>
                    <Button onClick={() => onUpdate(q.id, { options: [...q.options, ''] })} size='sm' variant='outline'>
                      Add Option
                    </Button>
                  </div>
                  <div className='space-y-2'>
                    {q.options.map((opt, i) => (
                      <div className='flex items-center gap-2' key={i}>
                        <Input
                          onBlur={(e) => {
                            const opts = [...q.options];
                            opts[i] = e.target.value;
                            onUpdate(q.id, { options: opts });
                          }}
                          defaultValue={opt}
                          placeholder={`Option ${i + 1}`}
                        />
                        <Button
                          onClick={() => onUpdate(q.id, { options: q.options.filter((_, j) => j !== i) })}
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
              {q.type === 'matrix' && (
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <label className='text-sm font-medium'>Matrix Rows</label>
                    <Button onClick={() => onUpdate(q.id, { rows: [...(q.rows ?? []), ''] })} size='sm' variant='outline'>
                      Add Row
                    </Button>
                  </div>
                  <div className='space-y-2'>
                    {(q.rows ?? []).map((row, i) => (
                      <div className='flex items-center gap-2' key={i}>
                        <Input
                          onBlur={(e) => {
                            const rows = [...(q.rows ?? [])];
                            rows[i] = e.target.value;
                            onUpdate(q.id, { rows });
                          }}
                          defaultValue={row}
                          placeholder={`Row ${i + 1}`}
                        />
                        <Button
                          onClick={() => onUpdate(q.id, { rows: (q.rows ?? []).filter((_, j) => j !== i) })}
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
              <Button disabled={isLoading} onClick={() => onDelete(q.id)} variant='destructive'>
                Delete Question
              </Button>
            </CardFooter>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

// ─── Form Editor ─────────────────────────────────────────────────────────────
function FormEditor() {
  const { createQuestion, deleteQuestion, error, isLoading, questions, setQuestions, updateQuestion } = useFormContext();
  const [adminStep, setAdminStep] = useState<number>(1);
  const [isSeeding, setIsSeeding] = useState(false);

  const stepQs = questions.filter((q) => q.step === adminStep);
  const totalSteps = Math.max(...questions.map((q) => q.step), 18);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = stepQs.findIndex((q) => q.id === active.id);
      const newIndex = stepQs.findIndex((q) => q.id === over.id);
      const reordered = arrayMove(stepQs, oldIndex, newIndex);

      // Update questions in context with new order
      setQuestions((prev) => {
        const others = prev.filter((q) => q.step !== adminStep);
        return [...others, ...reordered];
      });

      // Persist new order by updating each question
      for (let i = 0; i < reordered.length; i++) {
        await updateQuestion({ ...reordered[i] });
      }
    },
    [stepQs, adminStep, setQuestions, updateQuestion],
  );

  const handleUpdate = useCallback(
    async (id: string, patch: Partial<QuestionDefinition>) => {
      const question = questions.find((q) => q.id === id);
      if (!question) return;
      try {
        await updateQuestion({ ...question, ...patch });
      } catch (err) {
        console.error('Failed to update question:', err);
      }
    },
    [questions, updateQuestion],
  );

  const handleSeedQuestions = async () => {
    setIsSeeding(true);
    try {
      const res = await fetch('/api/admin/seed-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allQuestions),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(`Seeded ${data.seeded} questions successfully`);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || 'Failed to seed questions');
    } finally {
      setIsSeeding(false);
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
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-2xl'>Form Editor</CardTitle>
              <CardDescription>Edit questions and structure. Drag to reorder.</CardDescription>
            </div>
            {questions.length === 0 && (
              <Button disabled={isSeeding} onClick={handleSeedQuestions} variant='outline'>
                {isSeeding ? <Loader2Icon className='animate-spin mr-2' /> : null}
                Seed from existing questions
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <div className='flex-1'>
              <Select onValueChange={(v) => setAdminStep(Number(v))} value={String(adminStep)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select step to edit' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      Step {i + 1} ({questions.filter((q) => q.step === i + 1).length} questions)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              disabled={isLoading}
              onClick={() =>
                createQuestion({ options: [], rows: [], step: adminStep, text: 'New question', type: 'text' })
              }
            >
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
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={stepQs.map((q) => q.id)} strategy={verticalListSortingStrategy}>
              <Accordion className='w-full' collapsible type='single'>
                {stepQs.map((q, idx) => (
                  <SortableQuestion
                    idx={idx}
                    isLoading={isLoading}
                    key={q.id}
                    onDelete={deleteQuestion}
                    onUpdate={handleUpdate}
                    q={q}
                  />
                ))}
              </Accordion>
            </SortableContext>
          </DndContext>

          {stepQs.length === 0 && (
            <Card>
              <CardContent className='py-8'>
                <div className='text-center text-muted-foreground'>
                  No questions in this step yet.
                  <br />
                  Click &quot;+ Add Question&quot; to create one.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Answers View ─────────────────────────────────────────────────────────────
function AnswersView() {
  const [responses, setResponses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/admin/responses')
      .then((r) => r.json())
      .then((d) => {
        setResponses(Array.isArray(d) ? d : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <Spinner />
      </div>
    );
  }

  if (selected) {
    return (
      <div className='space-y-4'>
        <Button onClick={() => setSelected(null)} variant='outline'>
          ← Back to all responses
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{selected.respondent?.fullName ?? 'Unknown'}</CardTitle>
            <CardDescription>
              {selected.respondent?.email} · {selected.respondent?.company} ·{' '}
              {new Date(selected.submittedAt).getTime() > new Date(0).getTime()
                ? `Submitted ${new Date(selected.submittedAt).toLocaleString()}`
                : 'Not submitted yet'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className='h-[500px]'>
              <div className='space-y-3'>
                {selected.answers.map((a: any) => (
                  <div className='border rounded p-3' key={a.id}>
                    <p className='text-xs text-muted-foreground mb-1'>Question ID: {a.questionId}</p>
                    <pre className='text-sm whitespace-pre-wrap'>{JSON.stringify(a.value, null, 2)}</pre>
                  </div>
                ))}
                {selected.answers.length === 0 && (
                  <p className='text-muted-foreground text-sm'>No answers recorded.</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Responses</CardTitle>
        <CardDescription>{responses.length} total responses</CardDescription>
      </CardHeader>
      <CardContent>
        {responses.length === 0 ? (
          <p className='text-muted-foreground text-sm text-center py-8'>No responses yet.</p>
        ) : (
          <div className='space-y-2'>
            {responses.map((r) => (
              <div
                className='flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors'
                key={r.id}
                onClick={() => setSelected(r)}
              >
                <div>
                  <p className='font-medium'>{r.respondent?.fullName ?? 'Unknown'}</p>
                  <p className='text-sm text-muted-foreground'>
                    {r.respondent?.email} · {r.respondent?.company}
                  </p>
                </div>
                <div className='text-right'>
                  <Badge variant={new Date(r.submittedAt).getTime() > new Date(0).getTime() ? 'default' : 'outline'}>
                    {new Date(r.submittedAt).getTime() > new Date(0).getTime() ? 'Submitted' : 'In Progress'}
                  </Badge>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {new Date(r.submittedAt).getTime() > new Date(0).getTime()
                      ? new Date(r.submittedAt).toLocaleDateString()
                      : '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
