'use client';

import { useEffect } from 'react';

import { Assessment } from '@/components/assessment';
import { FormProvider } from '@/contexts/form-context';

export default function Home() {
  // useEffect(() => {
  //   const test = async () => {
  //     try {
  //       const data = await fetch('/api/sheet', {
  //         method: 'GET',
  //       });
  //       const res = await data.json();
  //       console.log(res);
  //       // console.log(await data.json());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   test();
  // }, []);

  return (
    <FormProvider>
      <Assessment />
    </FormProvider>
  );
}
