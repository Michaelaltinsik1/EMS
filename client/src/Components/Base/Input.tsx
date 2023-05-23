import { ChangeEvent, useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';
import { Theme } from 'src/Types/enums';
interface InputProps {
  type:
    | 'email'
    | 'text'
    | 'password'
    | 'tel'
    | 'date'
    | 'search'
    | 'datetime-local'
    | 'number'
    | 'time';
  label: string;
  name: string;
  register?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChangeHandler?: (value: string) => void;
}
const Input = ({
  type,
  label,
  name,
  register,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  onChangeHandler,
}: InputProps) => {
  const handleOnChange = (value: string) => {
    if (onChangeHandler) {
      onChangeHandler(value);
    }
  };
  const { theme } = useContext(ThemeContext);
  return (
    <label
      className={`font-body text-body ${
        theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
      }`}
      htmlFor={name}
    >
      {label}
      <input
        id={name}
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnChange(e.target.value)
        }
        className={`h-[56px] min-w-full px-4 py-3 text-body font-heading leading-150 rounded-lg border mt-2 ${className}  ${
          theme === Theme.LIGHT
            ? 'bg-gray-50 border-gray-900 text-gray-900 outline-blue-600 outline-1 '
            : 'bg-gray-600 border-gray-50 text-gray-900 outline-blue-400 outline-1 '
        }`}
      />
      {required && <p>*</p>}
    </label>
  );
};
export default Input;
