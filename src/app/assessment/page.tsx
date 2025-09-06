import { CircleX } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';

import { Button, Card } from '@/components/ui';

import AssessmentPage from './assessment';

export default async function Page() {
  const cookieValues = (await cookies()).get('response_id');

  if (!cookieValues) {
    return (
      <Card className='min-w-xs flex items-center rounded-sm absolute top-1/3 left-1/2 -translate-1/2 bg-red-100'>
        <CircleX className='text-red-600' />
        <div className='text-center'>
          <p className='font-bold text-md'>No Response ID found</p>
          <p className='text-muted-foreground text-sm mt-1'>
            Please contact our admin
          </p>
        </div>
        <Link href={'/'}>
          <Button className='rounded-sm' size={'sm'}>
            Go Back
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Suspense fallback={<div>Loading Quiz...</div>}>
      <AssessmentPage responseValue={cookieValues.value} />
    </Suspense>
  );
}
