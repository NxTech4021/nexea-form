import { Assessment } from '@/components/assessment';
import { FormProvider } from '@/contexts/form-context';

export default function Home() {
  return (
    <FormProvider>
      <Assessment />
      <h1>Tes</h1>
    </FormProvider>
  );
}
