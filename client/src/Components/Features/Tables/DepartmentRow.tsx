import { Theme } from 'src/Types/enums';
import { DepartmentType } from 'src/Types';
import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../hooks/useBreakpoint';
interface rowProps {
  department: DepartmentType;
  theme?: Theme;
}
const DepartmentRow = ({ department, theme }: rowProps) => {
  const { isTablet } = useBreakpoint();
  let address: string = '';
  if (
    department?.addresses?.zip &&
    department?.addresses?.city &&
    department?.addresses?.country
  ) {
    address = `${department?.addresses?.zip} ${department?.addresses?.city} ${department?.addresses?.country}`;
  }
  return (
    <>
      <tr
        className={`[&>td]:py-4 border-b border-opacity-50 rounded-lg last-of-type:border-none cursor-pointer ${
          theme === Theme.LIGHT
            ? 'border-gray-900  hover:bg-gray-300 active:bg-gray-400'
            : 'border-gray-100 hover:bg-gray-800 active:bg-gray-900'
        }`}
      >
        <TableItem type="tableData">{department.name}</TableItem>
        {!isTablet && <TableItem type="tableData">{department.id}</TableItem>}
        <TableItem type="tableData">{department.budget}</TableItem>
        <TableItem type="tableData">
          {department.created_at.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">{address || ''}</TableItem>
      </tr>
    </>
  );
};
export default DepartmentRow;
