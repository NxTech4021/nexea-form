import { Assessment } from '@/components/assessment';
import { FormProvider } from '@/contexts/form-context';

export default function Home() {
  return (
    <FormProvider>
      <Assessment />
      <h1>asda</h1>
    </FormProvider>
  );
}
