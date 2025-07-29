import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  type?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, disabled, name, type = 'text', ...props }, ref) => {
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
              aria-invalid={error ? 'true' : 'false'}
              className={cn(
                'w-full',
                error && 'border-red-500 focus-visible:ring-red-500',
                disabled && 'opacity-50 cursor-not-allowed',
                className
              )}
              disabled={disabled}
              ref={ref}
              type={type}
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
