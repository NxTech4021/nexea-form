import { FormProvider } from "@/contexts/form-context";
import { Assessment } from "@/components/assessment";

export default function Home() {
  return (
    <FormProvider>
      <Assessment />
    </FormProvider>
  );
}
