import { useContext } from 'react';
import { ThemeContext } from '../Features/Context/ThemeProvider';
import { Theme } from 'src/Types/enums';

/**
 * Add type guard to check for type
 */
interface SelectProps {
  //options: Array<{ id: string; name: string }>;
  options: Array<string> | Array<{ id: string; name: string }>;
  label: string;
  name: string;
  register?: any;
  className?: string;
  errors?: any;
  isErrorSpaceDiv?: boolean;
  required?: boolean;
}

const Select = ({
  options,
  label,
  name,
  register,
  className = '',
  errors,
  isErrorSpaceDiv = true,
  required,
}: SelectProps) => {
  let inputError: any;

  if (errors && errors.hasOwnProperty(name)) {
    inputError = errors[name];
  }
  function isCustomObject(
    option: string | { id: string; name: string }
  ): option is { id: string; name: string } {
    return (option as { id: string; name: string }).id !== undefined;
  }

  const { theme } = useContext(ThemeContext);
  // const defaultValue =
  //   options.length > 0 && isCustomObject(options[0])
  //     ? options[0]?.id
  //     : options[0];

  return (
    <>
      <label
        className={`font-body text-body  ${
          theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
        }`}
        htmlFor={name}
      >
        <div className="flex items-center ">
          {required && <span className="mr-2 font-body font-bold mt-1">*</span>}
          {label}{' '}
        </div>
        <select
          className={`h-[56px] min-w-full px-4 py-3 text-body font-heading leading-150 rounded-lg border mt-2] ${className}  ${
            theme === Theme.LIGHT
              ? 'bg-gray-50 border-gray-900 text-gray-900 outline-blue-600 outline-1 '
              : 'bg-gray-600 border-gray-50 text-gray-100 outline-blue-400 outline-1 '
          }`}
          name={name}
          id={name}
          {...register(name)}
        >
          {options.map((option) => {
            if (isCustomObject(option)) {
              return (
                <option
                  className={`${
                    theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
                  }`}
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                  {/* <Icon name="Expand" theme={theme} /> */}
                </option>
              );
            } else {
              return (
                <option
                  className={`${
                    theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
                  }`}
                  key={option}
                  value={option}
                >
                  {option}
                  {/* <Icon name="Expand" theme={theme} /> */}
                </option>
              );
            }
          })}
        </select>
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
    </>
  );
};
export default Select;
