import { useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';
import { Theme } from 'src/Types/enums';
import Icon from './Icon';

interface SelectProps {
  options: Array<string>;
  label: string;
  name: string;
  register?: any;
  className?: string;
}

const Select = ({
  options,
  label,
  name,
  register,
  className = '',
}: SelectProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <label
        className={`font-body text-body  ${
          theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
        }`}
        htmlFor={name}
      >
        {label}

        <select
          className={`h-[56px] min-w-full px-4 py-3 text-body font-heading leading-150 rounded-lg border mt-2 mb-[30px] ${className}  ${
            theme === Theme.LIGHT
              ? 'bg-gray-50 border-gray-900 text-gray-900 outline-blue-600 outline-1 '
              : 'bg-gray-600 border-gray-50 text-gray-100 outline-blue-400 outline-1 '
          }`}
          name={name}
          id={name}
          {...register(name)}
        >
          {options.map((option) => {
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
          })}
        </select>
      </label>
    </>
  );
};
export default Select;
