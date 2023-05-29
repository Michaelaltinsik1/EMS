import { Theme } from 'src/Types/enums';
import { UserType } from 'src/Types';
import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { capitalizeFirstLetter } from 'src/utils/functions';
interface rowProps {
  user: UserType;
  theme?: Theme;
}
const EmployeeRow = ({ user, theme }: rowProps) => {
  const { isTablet, isDesktop, isDesktopEdgeCaseBreakpoint } = useBreakpoint();
  console.log('user: ', user);
  return (
    <>
      <tr
        className={`[&>td]:py-4 border-b border-opacity-50 cursor-pointer rounded-lg last-of-type:border-none  ${
          theme === Theme.LIGHT
            ? 'border-gray-900 hover:bg-gray-300 active:bg-gray-400'
            : 'border-gray-100 hover:bg-gray-800 active:bg-gray-900'
        }`}
      >
        <TableItem type="tableData">{`${user.firstName} ${user.lastName}`}</TableItem>
        <TableItem type="tableData">{user?.role?.name}</TableItem>
        {!isTablet && (
          <TableItem type="tableData">{user?.date_of_birth}</TableItem>
        )}
        {isTablet ||
          (isDesktopEdgeCaseBreakpoint && isDesktop && (
            <TableItem type="tableData">{user?.id}</TableItem>
          ))}
        {!isTablet && <TableItem type="tableData">{user.email}</TableItem>}
        {isTablet ||
          (isDesktopEdgeCaseBreakpoint && isDesktop && (
            <TableItem type="tableData">
              {user.created_at.toString().split('T')[0]}
            </TableItem>
          ))}
        {!isTablet && (
          <TableItem type="tableData">
            {user.created_at.toString().split('T')[0]}
          </TableItem>
        )}
        <TableItem type="tableData">{user?.department?.name || ''}</TableItem>
        {!isTablet && <TableItem type="tableData">{user.salary}</TableItem>}
        <TableItem type="tableData">
          {capitalizeFirstLetter(user.permission.toLocaleLowerCase())}
        </TableItem>
      </tr>
    </>
  );
};
export default EmployeeRow;
