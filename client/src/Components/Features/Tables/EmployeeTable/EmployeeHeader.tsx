import { Theme } from 'src/Types/enums';

import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface EmployeeHeaderProps {
  theme: Theme;
}
const EmployeeHeader = ({ theme }: EmployeeHeaderProps) => {
  const { isTablet, isDesktopEdgeCaseBreakpoint, isDesktop } = useBreakpoint();
  return (
    <tr
      className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg  ${
        theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
      }`}
    >
      <TableItem type="tableHeader">Name</TableItem>
      <TableItem type="tableHeader">Role</TableItem>
      {!isTablet && <TableItem type="tableHeader">Day of birth</TableItem>}
      {isTablet ||
        (isDesktopEdgeCaseBreakpoint && isDesktop && (
          <TableItem type="tableHeader">Id</TableItem>
        ))}
      {!isTablet && <TableItem type="tableHeader">Email</TableItem>}
      {!isTablet && <TableItem type="tableHeader">Hire date</TableItem>}
      <TableItem type="tableHeader">Department</TableItem>
      {!isTablet && <TableItem type="tableHeader">Salary</TableItem>}
      <TableItem type="tableHeader">Permission</TableItem>
    </tr>
  );
};
export default EmployeeHeader;
