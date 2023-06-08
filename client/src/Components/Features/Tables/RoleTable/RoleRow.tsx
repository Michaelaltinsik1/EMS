import { Theme } from 'src/Types/enums';
import { RoleType } from 'src/Types';
import TableItem from 'src/Components/Base/TableItem';
import { useState } from 'react';
import RoleForm from '../../Forms/RoleForm';
interface rowProps {
  role: RoleType;
  theme?: Theme;
}
const RoleRow = ({ role, theme }: rowProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  return (
    <>
      <tr
        onClick={toggleForm}
        className={`[&>td]:py-4 border-b border-opacity-50 rounded-lg last-of-type:border-none cursor-pointer ${
          theme === Theme.LIGHT
            ? 'border-gray-900 hover:bg-gray-300 active:bg-gray-400'
            : 'border-gray-100 hover:bg-gray-800 active:bg-gray-900'
        }`}
      >
        <TableItem type="tableData">{role.name}</TableItem>
        <TableItem type="tableData">{role.id}</TableItem>
        <TableItem type="tableData">
          {role.created_at.toString().split('T')[0]}
        </TableItem>
      </tr>
      {isFormOpen && (
        <RoleForm
          setIsFormOpen={setIsFormOpen}
          role={role}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default RoleRow;
