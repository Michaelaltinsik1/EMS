import { Theme } from 'src/Types/enums';

import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface DepartmentHeaderProps {
  theme: Theme;
}
const DepartmentHeader = ({ theme }: DepartmentHeaderProps) => {
  const { isTablet } = useBreakpoint();
  return (
    <thead>
      <tr
        className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg ${
          theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
        }`}
      >
        <TableItem type="tableHeader">Name</TableItem>
        {!isTablet && <TableItem type="tableHeader">Id</TableItem>}
        <TableItem type="tableHeader">Budget</TableItem>
        <TableItem type="tableHeader">Created at</TableItem>
        <TableItem type="tableHeader">Address</TableItem>
      </tr>
    </thead>
  );
};
export default DepartmentHeader;
