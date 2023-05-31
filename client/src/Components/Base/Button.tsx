import React, { ReactNode } from 'react';
import Loader from './Loader';
interface ButtonProps {
  type: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  children: ReactNode;
  variant: 'addButton' | 'removeButton' | 'confirmRemoveButton';
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
  const handleVariant = () => {
    switch (variant) {
      case 'addButton':
        return 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-gray-900';
      case 'removeButton':
        return 'bg-red-400 text-gray-900 hover:bg-red-500 active:bg-red-600 hover:text-gray-100 active:text-gray-100';
      case 'confirmRemoveButton':
        return 'bg-gray-100 text-red-dark border-[2px] border-solid border-red-400 hover:bg-red-500 hover:text-gray-100 hover:border-red-500 active:bg-red-600 active:text-gray-100 active:border-red-600';
    }
  };
  return (
    <button
      onClick={onClick}
      className={`border-red-400 w-full h-[52px] desktop:w-[142px] font-body text-bodySmall font-bold rounded-2xl ${className} ${handleVariant()} `}
      type={type}
      disabled={disabled}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};
export default Button;
