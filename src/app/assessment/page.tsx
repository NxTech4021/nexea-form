import { Suspense } from 'react';

import AssessmentPage from './assessment';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Quiz...</div>}>
      <AssessmentPage />
    </Suspense>
  );
}
