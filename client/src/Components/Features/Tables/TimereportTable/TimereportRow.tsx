import { Theme } from 'src/Types/enums';
import { Time_reportType } from 'src/Types';
import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { capitalizeFirstLetter } from 'src/utils/functions';
import { useState } from 'react';
import TimereportForm from '../../Forms/TimereportForm';
interface rowProps {
  timereport: Time_reportType;
  theme?: Theme;
}
const TimereportRow = ({ timereport, theme }: rowProps) => {
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
        <TableItem type="tableData">{`${timereport.user?.firstName} ${timereport.user?.lastName}`}</TableItem>
        <TableItem type="tableData">
          {timereport.user?.role?.name || ''}
        </TableItem>
        <TableItem type="tableData">
          {timereport?.user?.date_of_birth}
        </TableItem>
        {!isTablet && <TableItem type="tableData">{timereport.id}</TableItem>}
        <TableItem type="tableData">
          {timereport.user?.projects[0]?.name}
        </TableItem>
        <TableItem type="tableData">
          {timereport.created_at.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">
          {timereport.from.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">
          {timereport.to.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">
          {capitalizeFirstLetter(timereport.status.toLocaleLowerCase())}
        </TableItem>
      </tr>
      {isFormOpen && (
        <TimereportForm
          setIsFormOpen={setIsFormOpen}
          timereport={timereport}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default TimereportRow;
