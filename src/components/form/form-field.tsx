import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '../ui/input';

export interface FormFieldType {
  name: string;
  other?: object;
  placeholder?: string;
  type: string;
}

const FormField = ({ name, type, ...other }: FormFieldType) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Input
            {...field}
            className={error && 'border-red-400 focus-visible:ring-red-400'}
            onChange={(e) => field.onChange(e.target.value)}
            type={type}
            {...other}
          />
          {error && (
            <p className='text-[12px] text-red-500 -mt-2 ml-2'>
              {error.message}
            </p>
          )}
        </>
      )}
    />
  );
};

export default FormField;
