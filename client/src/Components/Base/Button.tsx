import React, { ReactNode } from 'react';
import Loader from './Loader';
interface ButtonProps {
  type: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  children: ReactNode;
  variant: 'addButton' | 'removeButton';
  hasIcon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button = ({
  type,
  disabled = false,
  className = '',
  loading = false,
  children,
  variant,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[52px] desktop:w-[142px] font-body text-bodySmall font-bold rounded-2xl ${className} ${
        variant === 'addButton'
          ? 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-gray-900'
          : 'bg-red-400 text-gray-900 hover:bg-red-500 active:bg-red-600 hover:text-gray-100 active:text-gray-100'
      } `}
      type={type}
      disabled={disabled}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};
export default Button;
