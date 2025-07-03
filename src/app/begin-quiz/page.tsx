import { Suspense } from 'react';

import BeginQuiz from './quiz';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Quiz...</div>}>
      <BeginQuiz />
    </Suspense>
  );
}
