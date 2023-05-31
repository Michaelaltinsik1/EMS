import { ReactNode } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../Features/Context/ThemeProvider';
import { Theme } from 'src/Types/enums';

interface ButtonProps {
  className?: string;
  children: ReactNode | ReactNode[];
  type: 'tableData' | 'tableHeader';
}
const TableItem = ({ className = '', children, type }: ButtonProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {type === 'tableHeader' ? (
        <th
          className={`font-heading font-bold text-start text-h5 pl-4 whitespace-nowrap overflow-hidden text-ellipsis ${
            theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
          } ${className}`}
        >
          {children}
        </th>
      ) : (
        <td
          className={`font-body font-normal first-of-type:pr-4 last-of-type:px-4 px-4 whitespace-nowrap overflow-hidden text-ellipsis ${
            theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
          } ${className}`}
        >
          {children}
        </td>
      )}
    </>
  );
};
export default TableItem;
