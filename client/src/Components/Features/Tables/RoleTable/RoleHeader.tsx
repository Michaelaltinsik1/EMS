import { Theme } from 'src/Types/enums';

import TableItem from 'src/Components/Base/TableItem';

interface RoleHeaderProps {
  theme: Theme;
}
const RoleHeader = ({ theme }: RoleHeaderProps) => {
  return (
    <thead>
      <tr
        className={`[&>th]:py-4 border-b border-opacity-50 w-screen rounded-lg ${
          theme === Theme.LIGHT ? 'border-gray-900' : 'border-gray-100'
        }`}
      >
        <TableItem type="tableHeader">Name</TableItem>
        <TableItem type="tableHeader">Id</TableItem>
        <TableItem type="tableHeader">Created at</TableItem>
      </tr>
    </thead>
  );
};
export default RoleHeader;
