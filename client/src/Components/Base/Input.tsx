import { ChangeEvent, useContext } from 'react';
import { ThemeContext } from '../Features/Context/ThemeProvider';
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
  errors?: any;
  isErrorSpaceDiv?: boolean;
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
  errors,
  isErrorSpaceDiv = true,
  onChangeHandler,
}: InputProps) => {
  let inputError: any;

  if (errors && errors.hasOwnProperty(name)) {
    inputError = errors[name];
  }
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
      {register ? (
        <input
          id={name}
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          {...register(name)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e.target.value)
          }
          className={`h-[56px] min-w-full px-4 py-3 text-body font-heading leading-150 rounded-lg border mt-2 ${className}  ${
            theme === Theme.LIGHT
              ? 'bg-gray-50 border-gray-900 text-gray-900 outline-blue-600 outline-1 '
              : 'bg-gray-600 border-gray-50 text-gray-100 outline-blue-400 outline-1 '
          }`}
        />
      ) : (
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
              : 'bg-gray-600 border-gray-50 text-gray-100 outline-blue-400 outline-1 '
          }`}
        />
      )}

      {required && <p>*</p>}
      {isErrorSpaceDiv && (
        <div className="min-h-[30px]">
          {inputError && (
            <p
              className={`font-bold text-bodySmall font-body ${
                theme === Theme.LIGHT
                  ? 'text-red-600'
                  : 'bg-red-400 text-gray-100 py-1 px-2 rounded-[6px] my-2'
              }`}
            >
              {inputError?.message}
            </p>
          )}
        </div>
      )}
    </label>
  );
};
export default Input;
