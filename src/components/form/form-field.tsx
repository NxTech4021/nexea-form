import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '../ui/input';

export interface FormFieldType {
  name: string;
  placeholder?: string;
  type: string;
  disabled?: boolean;
  className?: string;
}

const FormField = ({ name, type, disabled, className, ...other }: FormFieldType) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Input
            {...field}
            className={`${error ? 'border-red-400 focus-visible:ring-red-400' : ''} ${className || ''}`}
            onChange={(e) => field.onChange(e.target.value)}
            type={type}
            disabled={disabled}
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
