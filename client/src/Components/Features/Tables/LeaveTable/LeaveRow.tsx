import { Theme } from 'src/Types/enums';
import { LeaveType } from 'src/Types';
import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterRemoveUnderline,
} from 'src/utils/functions';
interface rowProps {
  leave: LeaveType;
  theme?: Theme;
}
const LeaveRow = ({ leave, theme }: rowProps) => {
  const { isTablet } = useBreakpoint();
  return (
    <>
      <tr
        className={`[&>td]:py-4 border-b border-opacity-50 rounded-lg last-of-type:border-none cursor-pointer ${
          theme === Theme.LIGHT
            ? 'border-gray-900 hover:bg-gray-300 active:bg-gray-400'
            : 'border-gray-100 hover:bg-gray-800 active:bg-gray-900'
        }`}
      >
        <TableItem type="tableData">{`${leave.user?.firstName} ${leave.user?.lastName}`}</TableItem>
        <TableItem type="tableData">{leave.user?.role?.name || ''}</TableItem>
        <TableItem type="tableData">{leave.user?.date_of_birth}</TableItem>
        {!isTablet && <TableItem type="tableData">{leave.id}</TableItem>}
        <TableItem type="tableData">
          {capitalizeFirstLetterRemoveUnderline(
            leave.type_of_leave.toLocaleLowerCase()
          )}
        </TableItem>
        <TableItem type="tableData">
          {leave.from.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">
          {leave.to.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">
          {capitalizeFirstLetter(leave.status.toLocaleLowerCase())}
        </TableItem>
      </tr>
    </>
  );
};
export default LeaveRow;
