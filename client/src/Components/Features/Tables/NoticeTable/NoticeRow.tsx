import { Theme } from 'src/Types/enums';
import { NoticeType } from 'src/Types';
import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { capitalizeFirstLetter } from 'src/utils/functions';
import { useState } from 'react';
import NoticeForm from '../../Forms/NoticeForm';
interface rowProps {
  notice: NoticeType;
  theme?: Theme;
}
const NoticeRow = ({ notice, theme }: rowProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const { isTablet } = useBreakpoint();
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
        <TableItem type="tableData">{`${notice.user?.firstName} ${notice.user?.lastName}`}</TableItem>
        <TableItem type="tableData">{notice.user?.role?.name || ''}</TableItem>
        <TableItem type="tableData">{notice.user?.date_of_birth}</TableItem>
        {!isTablet && <TableItem type="tableData">{notice.id}</TableItem>}
        <TableItem type="tableData">
          {notice.created_at.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">{notice.description || ''}</TableItem>
        <TableItem type="tableData">
          {capitalizeFirstLetter(notice.status.toLocaleLowerCase())}
        </TableItem>
      </tr>
      {isFormOpen && (
        <NoticeForm
          setIsFormOpen={setIsFormOpen}
          notice={notice}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default NoticeRow;
