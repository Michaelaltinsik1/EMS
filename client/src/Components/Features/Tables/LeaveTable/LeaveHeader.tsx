import { Theme } from 'src/Types/enums';

import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface LeaveHeaderProps {
  theme: Theme;
}
const LeaveHeader = ({ theme }: LeaveHeaderProps) => {
  const { isTablet } = useBreakpoint();
  return (
    <tr
      className={`[&>th]:py-4 border-b border-opacity-50 rounded-lg ${
        theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
      }`}
    >
      <TableItem type="tableHeader">Name</TableItem>
      <TableItem type="tableHeader">Role</TableItem>
      <TableItem type="tableHeader">Day of birth</TableItem>
      {!isTablet && <TableItem type="tableHeader">Id</TableItem>}
      <TableItem type="tableHeader">Type of leave</TableItem>
      <TableItem type="tableHeader">To</TableItem>
      <TableItem type="tableHeader">From</TableItem>
      <TableItem type="tableHeader">Status</TableItem>
    </tr>
  );
};
export default LeaveHeader;
