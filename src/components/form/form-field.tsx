import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ name, type = 'text', className, disabled, ...props }, ref) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="space-y-2">
            <Input
              {...field}
              {...props}
              type={type}
              className={cn(
                'w-full',
                error && 'border-red-500 focus-visible:ring-red-500',
                disabled && 'opacity-50 cursor-not-allowed',
                className
              )}
              disabled={disabled}
              ref={ref}
              aria-invalid={error ? 'true' : 'false'}
            />
            {error && (
              <p className="text-sm text-red-500">
                {error.message?.toString()}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
