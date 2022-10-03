import React, {
  FC,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

export type InputType = 'text' | 'email';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>;

const Input: FC<any> = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, label, type = 'text', className = '', placeholder, ...props },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={className}
        {...props}
      />
    );
  }
);

export default Input;
